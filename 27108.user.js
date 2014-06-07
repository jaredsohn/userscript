// ==UserScript==
// @name           Tycoon - Facebook
// @namespace      http://apps.facebook.com/beatycoon/empire*
// @description    Hay que comprar?
// @include        http://apps.facebook.com/beatycoon/empire*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function mystr2num(str){
	var temp = str.replace(/^\s+|\s+$/gi,'')+"";
	temp = temp.replace('$','')+"";
	var allnums = temp.split(",");
	var mystr = "";

	for(var i=0; i<(allnums.length-2); i++){
		mystr = mystr +allnums[i];
	}

	return parseInt(mystr);
}

function myGetDate(){
  var d = new Date();

  var month=new Array(12);
  month[0]="Jan";
  month[1]="Feb";
  month[2]="Mar";
  month[3]="Apr";
  month[4]="May";
  month[5]="Jun";
  month[6]="Jul";
  month[7]="Aug";
  month[8]="Sep";
  month[9]="Oct";
  month[10]="Nov";
  month[11]="Dec";

  return d.getDate() + ' ' + month[d.getMonth()];
}

(function(){
  var name;
  var value, iMax, iMin, dMin, dMax, lastValue;
  var i, j, d;
  var rstable, rsbr;;
  var cosas = xpath("//div[@id='app15420082636_content']/div[2]/div");
  
  for(i = 0; i < cosas.snapshotLength; i++) {
    if (cosas.snapshotItem(i).childNodes.length >= 5) {
      value = mystr2num(cosas.snapshotItem(i).childNodes[4].nodeValue);
      name = cosas.snapshotItem(i).childNodes[1].childNodes[3].childNodes[0].nodeValue.replace(' ', '_');
      lastValue = GM_getValue(name+'_lv');
      if (lastValue == undefined) {
        lastValue = value;
        GM_setValue(name+'_lv', value);
      };
      
      iMax = GM_getValue(name+'_max');
      dMax = GM_getValue(name+'_max_d', myGetDate());
      if (dMax == undefined) GM_setValue(name+'_max_d', dMax);
      
      if ((iMax == undefined) || (iMax < value)){
        iMax = value;
        GM_setValue(name+'_max', value);
  	  }
  	  
  	  iMin = GM_getValue(name+'_min');
  	  dMin = GM_getValue(name+'_min_d', myGetDate());
      if (dMin == undefined) GM_setValue(name+'_min_d', dMin);

      if ((iMin == undefined) || (iMin > value)){
        iMin = value;
        GM_setValue(name+'_min', value);
  	  }
      
      cosas.snapshotItem(i).childNodes[1].childNodes[1].style.width = '75px';
      cosas.snapshotItem(i).childNodes[1].childNodes[1].style.height = '75px';
      cosas.snapshotItem(i).childNodes[1].childNodes[1].style.align = 'center;'
      rstable = document.createElement("div");
      rstable.innerHTML = 
        "<font style=\"color:green\">Mínimo: $"+iMin+" ("+dMin+")</font>"+
        "<br>Actual: $"+value;
      if (lastValue != value) {
        GM_setValue(name+'_lv', value);
        if (lastValue <= value) {
          rstable.innerHTML += " (+"+(value - lastValue)+")";
        } else {
          rstable.innerHTML += " ("+(value - lastValue)+")";
        }
      };
      rstable.innerHTML += "<BR><font style=\"color:red\">Máximo: $"+iMax+" ("+dMax+")</font>";
      cosas.snapshotItem(i).insertBefore(rstable, cosas.snapshotItem(i).childNodes[4]);
      
      cosas.snapshotItem(i).setAttribute("align", "center");
      rsbr = document.createElement("br");
      cosas.snapshotItem(i).childNodes[1].insertBefore(rsbr, cosas.snapshotItem(i).childNodes[1].childNodes[2]);
      cosas.snapshotItem(i).removeChild(cosas.snapshotItem(i).childNodes[5]);
      cosas.snapshotItem(i).removeChild(cosas.snapshotItem(i).childNodes[5]);
    }; 
  }
})();
