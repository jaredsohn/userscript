// ==UserScript==
// @name           Tables to Graphs
// @description  Converts any tables on the page into graphs.  Also allows resizing of columns and sorting of headers.
// @namespace      16HquYn
// @include        *
// @exclude        http://www.ebay*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @require	   http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @require        http://raw.github.com/alvaro-prieto/colResizable/master/colResizable-1.3.min.js
// @require        http://raw.github.com/Mottie/tablesorter/master/js/jquery.tablesorter.js
// @require        http://www.flotcharts.org/flot/jquery.flot.js
// @require        http://www.flotcharts.org/flot/jquery.flot.categories.js
// @require        http://www.flotcharts.org/flot/jquery.flot.navigate.js
// @require        http://www.flotcharts.org/flot/jquery.flot.resize.js
// @version	   1.0.5
// ==/UserScript==

// @resource       jqueryuiCss http://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css

// @require        http://raw.github.com/jbritten/jquery-tablesorter-filter/master/tablesorter.js

// @require	   http://code.jquery.com/jquery-latest.js
//$.browser removed from jquery 1.9

GM_platform_wrapper("HTML Tables to Graphs", "16HquYn", true); 
log=function(str){GM_log(str);console.log(str);};
log2=log;
log=function(){}
log2=log;

unsafeWindow.draw_graph=draw_graph;  //allow direct call.
var no_thead, gcats=[], glabels=[], maxseries=[], maxes=[], table_type, row_length=[], discarded_hds=[];
var makeresizeable=GM_getValue("makeresizeable", true), jimmied_done, check_width=1789, no_css_width;

GM_registerMenuCommand("=====================", function(){  });
GM_registerMenuCommand("Graph Tables", function(){ graphTables(document); }, "G");
GM_registerMenuCommand("Make Tables Resizeable & Sortable, toggle ["+(makeresizeable?"on":"off")+"].", toggleMakeResize);
GM_registerMenuCommand("Delete or Swap Column(s)", deleteAColumn);
GM_registerMenuCommand("Add feint lines", feint);
GM_registerMenuCommand("=====================", function(){  });

addEventListener("load", function(){setTimeout(main,500);});
function main() {
   var style_done, roll="";
   //GM_addStyle("table {table-layout:auto !important;}");//rigifies but can disturb others.
   GM_addStyle(".width_checker { width: "+check_width+"px }  ");
   $("table").each(function(i){
      var that=$(this), twidth=that.width();
      var ths=that.find("th");
      if (makeresizeable) {
	 makeTableResizeable(this, i);
	 that.addClass("ttgxed"+ths.length)
      }
      if (style_done) return true;
      style_done=true;
      GM_addStyle(".ui-resizable { position: relative;}.ui-resizable-handle { position: absolute;font-size: 0.1px;z-index: 99999; display: block; }.ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; }.ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0; }.ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0; }.ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0; height: 100%; }.ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0; height: 100%; }.ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; }.ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; }.ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; }.ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}")
      $("head").append("<style>.tablesorter-headerAsc {  background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7); background-repeat: no-repeat; background-color: #fD4000;} .tablesorter-headerDesc { background-image:url(data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7); background-repeat: no-repeat;background-color: #fD4D4D; } </style>");
   });
}//main()

function draw_graph(ctx, doc, width, height) { //internal GM script function
    log("draw_graph, doc "+doc.body.firstElementChild.tagName+" "+ctx.firstElementChild.tagName);
    
    var t=$("table", ctx);
    log("Got t "+t);
    var popup=doc.defaultView;
    log("popup.GM_addStyle "+popup.GM_addStyle);
    //$(doc.head).append( "   <style type='text/css'>"+jqueryuiCss+"    </style>")

    window.sfsdoc=doc;
    
    graphTables(ctx);  ////////////////

    var p=$("#flotplaceholder1", doc);
    if (width) p.width(width);
    if (height) p.height(height);
    log($(p).children().length+" len, move to transplant ");
    $(p).children().each(function() {log(this.tagName); } );
    
}

function graphTables(ctx) { //jquery's second parameter, context must be a document or within a document.
    //$("body").prepend('<div id="graph" style="position: absolute; top: 230px; left: 675px; width:600px; height:300px"></div>');
    log("graphTables, context:"+ctx);
    var ts=$("table", ctx);
    log("tables #"+ts.length);
    $(window).keypress(function(e){if (e.keyCode==27) { $("#tooltip").remove();$(".legend").remove();}  });
    ts.each(function(i) {

	no_thead=undefined, gcats=[], glabels=[], maxseries=[], maxes=[], table_type, row_length=[], discarded_hds=[];
	var that=$(this);

	if (that.find("td").length<4) { GM_log("Too few data points at table:"+i);return;}
	if ( that.parent().prop("class")=="legend" ) return true;
	log("New table with "+that.find("tr").length+" rows");
	
	var d=extractFromTable(that);            /////////////////////////////////
	
	if ( d[2].length == 0) {GM_log("Too few data rows "+d[2].length+" at table:"+i);return true;}
	var off=that.offset(); //gets first offset of collection found
	off.top=that.find("tr").offset().top; //gets first offset of collection found, skips caption etc.
	//      var theight=that.css("height");
	var theight=(that.height()+10)+"px";
	var twidth=that.width();
	log(i+" Table width "+twidth+" height "+theight);
	log(i+" Table pos, left: "+off.left+", top "+off.top);
       //!!!if (twidth==0) { twidth=700, theight="500px"; }
	var elhtml='<div id=flotplaceholder'+(i+1)+' class=demo-flotplaceholder'+(i+1)+' style="width:'+twidth+'px;height:'+theight+'"></div>'
	var holder=that;//$("body");
	if (window.sfsdoc) holder=$("body");
	//holder=that.parent();
	holder.before(elhtml);
	var pq=$("#flotplaceholder"+(i+1));
	log("put flotplaceholder before "+holder.prop("tagName")+" GOt pq "+pq.length);
	pq.keyup(function(e){ log("keyup "); if(e.keyCode) pq.remove(); });
	//pq.parent().dialog({ height: 140,modal: true});
	pq.css({ backgroundColor: "black",
		 position: "absolute",
		 //	       left: Math.max(0,off.left),
		 paddingLeft: Math.max(0,off.left),
		 top: Math.max(0,off.top),
		 zIndex: 9999
	       });
	pq.get(0).style.setProperty('position', 'absolute', 'important');
	
	log("flotplaceholder +"+(i+1)+", abs at left: "+pq.css("left")+", top: "+pq.css("top") );
	
	log("appended to body , ph:"+(i+1)+ ", width: "+$(pq).width() );
	var container=$("<div class=demo-container></div>");
	pq.wrap(container);
	
	drawAtable(i+1, d[0], d[1], d[2]); ////////////////////
	
	if ( window.sfsdoc) {
	    var body=$("body", window.sfsdoc);//plot not working of other win opened, so this moves it there.
	    body.append(pq);
	    // var table=$(that, window.sfsdoc);//plot not working of other win opened, so this moves it there.
	    // table.before(pq);
	    pq=$("#flotplaceholder"+(i+1), window.sfsdoc);
	    // var container2=$("<div class=demo-container></div>");
	    // pq.wrap(container2);
	    $(".tickLabel", body).css({ backgroundColor: "black" });
	}
	pq.css({ height: theight,
		 width: twidth+"px" }); // ( twidth * ( 1+ (160/twidth) ) )+"px"});
	//pq.click(function(e) {log("CLICK "+e.button+" ctrl "+e.ctrlKey);this.remove();});
	
	log(i+" Graph width "+pq.width()+" height "+pq.height());
	log(i+" Graph pos, left: "+pq.offset().left+", top "+pq.offset().top);
	
	var but=$("<button id=sfsButton style='position:absolute;bottom:0;margin-bottom:-50px'>Close</button>");
	pq.append(but);
	but.click(function(e) { pq.remove(); $(this).remove(); $("#tooltip", window.sfsdoc).remove(); 
				body.scrollLeft(99999);
				$(".CRC", window.sfsdoc).remove();});
	//pq.resizable();
	//$(".legendLabel").css({background: "transparent"});
	GM_addStyle(".tickLabel { background-color: black; }");
	GM_addStyle(".legend * { color: #fff000;background: transparent!important;}"); //background-color: rgba(255,0,0,0) !important; }");//black
	//$("button").button();
	makeTableResizeable(that);
    });//end $tables.each.
    log("End graphTables");
}

function extractFromTable(t){
    gcats=extractCatsFromTable(t);           // headers
    glabels=extractLabelsFromTable(t);       // series/lines
    var data=extractDataFromTable(t, gcats.length);
    log("Gcats "+gcats);
    var data_per_row=median(row_length);
    log2("med data per row "+data_per_row+", have cats len: "+gcats.length );
    if (gcats.length < data_per_row) {
	if (discarded_hds.length)  while(gcats.length + discarded_hds.length > data_per_row) gcats.shift();
	while(gcats.length < data_per_row) {
	    if (discarded_hds.length) gcats.unshift(discarded_hds.pop()+".");
	    else gcats.unshift("unknown");
	}
    }
    return [ gcats, glabels, data ];
}

function extractCatsFromTable(table) { //contents of table column headers, th.
    //["January", "February", "March"];
    var cats=[], dups={}, th_lens=[], empties=[];

    var headers=$(table).find("tr:first th"); // was find("th");

    $(table).find("thead tr").each(function(i){ th_lens.push( $(this).find("th").length );
						log2(i+" th len: "+th_lens[i]); });
    var thrmaxi=arrmax(th_lens, "index");//gets best tr in head if >1 tr there.
    log2("cats thrmaxi max row is "+thrmaxi);
    var hrows=$(table).find("thead tr");
    log2("hrows has "+hrows.length);
    if (thrmaxi!=-1) {
	headers=$(hrows[thrmaxi]).find("th");
	hrows.splice(thrmaxi,1);
	hrows.find("th").each(function(i) { 
	    if (thrmaxi==0) discarded_hds.push($(this).text()); 
	    else if (i!=0) discarded_hds.push($(this).text()); 
	});
	log2("dis "+discarded_hds.length);
    }
    else {
	headers=$(table).find("tr:first th");
	if (headers.length==0) headers=$(table).find("tr:first td");
	no_thead=true;
    }
    if (thrmaxi==0) { log2("splice 1st header"); headers.splice(0,1); }// first header is in corner and not relevant.
    log2("got headers "+headers.length);
    $(headers).each(function(i){
	//log("tc:"+this.textContent+".");
	var tc=this.textContent.trim();
	if (tc) { //tc=0;
	    if (dups[tc]) { dups[tc]++; tc=tc+"["+dups[tc]+"]";}
	    else dups[tc]=1;
	    cats.push(tc+".");
	}
	else empties.push(i);
    });
    log2("Got cats, table headers, as " + cats +"\n # "+cats.length+" empties idex:"+empties+".");
    return cats;
}

function extractLabelsFromTable(table) { // first td/th in each row  of body, each tr is a series or line.
    //return ["jumper", "cardigan", "pullover", "slip" ];
    var labels=[], rowheads;
    var tds_at_rowheads=$(table).find("tbody tr td:first-child");	
    log("tds at rowhead "+tds_at_rowheads.length);
    var ths_at_rowheads=$(table).find("tbody tr:has(th)" );
    log("ths at row head "+ths_at_rowheads.length);
    rowheads=tds_at_rowheads;
    if (tds_at_rowheads.length < ths_at_rowheads.length-1 ) { // each row has th at start for column header.
	rowheads=$(table).find("tbody tr:has(td) th"); //rwoheads=$(table).find("tr:gt(0) th");
	// if ($(table).find("thead tr").length <= 1 && ! no_thead)
	//     gcats.shift();  //first cat is in corner, if header row single.
	table_type="ths_at_rowheads";
	log("type: ths_at_rowheads");
    }
    if (no_thead) {//determine corner one.
	log("NO_THEAD "+rowheads[0].textContent)
	log(" gc "+gcats[0]);
	//if (gcats[0]==0) gcats.shift();
	//rowheads.splice(0,1);//first rowhead is in corner top left and not a row.  jquery has no shift or pop.
    }
    rowheads.each(function(i){
	var tc=this.textContent.trim();
	//log("labels tc:"+tc+".");
	//if (tc)
	labels.push(tc);
    });
    log2("Got labels (1st td, or th, in each row, line/series): "+labels+" #" +labels.length);
    return labels;
}

function extractDataFromTable(table, catslen) { // second and subsequent td in each row of body.
    // [ [10, 8, 4], [20,10,20], [10,15,10], [30,10,4] ] ;
    //   each subarray is a set of point on the line graph, a series, and is relevant for each label
    //   each element of a subarry is for a particular category (or table column header).
    var data=[], dels=0, content;
    var rows=$(table).find("tbody tr");
    if (table_type=="ths_at_rowheads") rows=$(table).find("tbody tr:has(th)");
    log("got data rows, trs in body: "+rows.length);
    //if (table_type=="ths_at_rowheads") { var r=rows.splice(0,1); log2("rm row 0 "+r); }
    rows.each(function(i){ // for each label/series
	data.push([]);
	var tds=$(this).find("td:gt(0)");//get all tds except first one.
	if (table_type=="ths_at_rowheads")
	    tds=$(this).find("td");
	content=false;
	$(tds).each(function(){ // for each category
	    var tc=this.textContent.trim();
	    // if (! Number(tc)) { 
	    //   if (/\w/.test(tc)) tc=tc.length; else tc=1; 
	    //   var arxs=[];arxs[catslen!!gcats]=0;
	    //   $(arxs).each(function() { data[i].push(tc++); });
	    // }
	    //if (Number(tc))
	    tc=Number(tc.replace(/[,$£€]/g,""));
	    //log("data tc:"+tc+".");
	    if (Number(tc)) {
		data[data.length-1].push(tc);
		content=true;
	    }
	    else data[data.length-1].push(0.101);
	});//end tds.each()

	//log2(i+"# Got row data ("+data[data.length-1].length+") "+data[data.length-1]+"\nlabel: "+glabels[i-dels]+", dels: "+dels);
	if ( ! content || data[data.length-1].length==0) {
	    data.pop();//row empty
	    glabels.splice(i-dels,1);
	    log2("NO data in i "+i+" labels:"+glabels);
	    dels++;
	} 
	else 	
	    maxseries.push(arrmax(data[data.length-1]));
    }); //end rows.each()
    data.forEach(function(el){ //each row
	var empties=0;
	for(var i=0;i<el.length;i++)
	    if (el[i]==0.101){
		el[i]=""; //el.splice(i--,1);
		empties++;
	    }
	row_length.push(el.length-empties);
    });
    //log2("GOT DATA ("+data.length+"):" + uneval(data));
    //log2("maxseries ("+maxseries.length+"): "+maxseries);
    return data;
}

function showChartTooltip(x, y, msg, maxes) {
    var tagger=$('<div id="tooltip">' + msg + 
		 "<br><div style='font-size: xx-small;'><p>Double click on table to change scale, current max y size is:"
		 +maxes[0].n+".</p><br><br>Click or Esc to remove this box or legend at left.</div>"
		 +"</div>").css( {
		     position: 'absolute',
		     top: y,
		     left: x-((x/window.innerWidth)*50),
		     border: '1px solid #bfbfbf',
		     padding: '2px',
		     backgroundColor: '#fffffe',
		     //		     background: "transparent",
		     //		     opacity: 1,
		     zIndex: 99999,
		     maxWidth: "150px"
		 });
    //tagger.appendTo("body", window.sfsdoc).fadeIn(200);
    //log(" x "+tagger.css("left"));
    var otherbody=$("body", window.sfsdoc);
    $(otherbody).append(tagger).fadeIn(400);
    tagger.click(function(e){this.remove();});
    //tagger.fadeOut(25000);
}

function drawAtable(index, cats, labels, data_in) {
   //log("draw at, index:"+index+", cats:"+uneval(cats)+", labels:"+uneval(labels)+", data:"+uneval(data_in));
   //  $('body').append('<div id=flotplaceholder'+index+' style="width:600px;height:600px"></div>');
   //$('body', doc);
   var objarr=[], data=[];
   for (var i in data_in)  {
      data[i]=[];
      for(var j in cats) 
	 data[i][j]=[ cats[j], data_in[i][j] ];
      objarr[i]={ label: labels[i], data: data[i] }
   }
   objarr.sort(function(a, b){ // if return < 0, then put a ahead of b.  eg, a - b for ascending
      var bm=mean(b.data.map(el1)), am=mean(a.data.map(el1));
      function el1(el) {return el[1];}
      //log2("sort objarr a mean:"+am+", b mean: "+bm+" if neg bm-am, then putting a series, "+a.label+", ahead of b, "+b.label);
      return bm - am;
   });
   //$(objarr).each(function(i){log(i+"th ORDER for, "+this.label)});
   //objarr is eg, [{label:"sfs version", data:[["Tue Oct 01", "36"], ["Wed Oct 02", "48"]} {label:"sfs installs", data:[["Tue Oct 01", ""], ["Wed Oct 02", "49"]}]
   maxes=[
      { v:median(maxseries)+medianAbsoluteDeviation(maxseries), n:"median+MAD"},
      { v:medianAbsoluteDeviation(maxseries)*2+geomean(maxseries), n:"2xMAD+geomean" }, 
      { v:mean(maxseries)+standardDeviation(maxseries), n: "mean+SD" },
      { v:mean(maxseries)+arrmax(maxseries)/2, n:"mean+max/2"},
      { v:arrmax(maxseries), n:"max-value"}
   ]
   var maxval=maxes[0].v;
   log("maxval "+maxval);
   var placeholder=$("#flotplaceholder"+index);
   var options=
      {  
	 xaxis: { mode: "categories", tickLength: 0, zoomRange: [ 1, 5000], panRange: [ -5000, 5000] }
	 ,yaxis: { max: maxval, zoomRange: [ 1, 5000], panRange: [ -5000, 5000] }
	 ,grid: {  interactive: true, hoverable: true, clickable: true, mouseActiveRadius: 50 } //hoverable: true,
	 ,legend: { position: "nw" }
	 ,series: { lines: { show: true }, points: { show: true} } //points: { show: true } }
	 ,zoom: { interactive: true, cursor: "move"}
	 ,pan: {interactive: true, cursor: "move"}
      }
   
   var graph=$.plot(placeholder, objarr, options); ////////////////////////////

   
   $(".legend", window.sfsdoc).click(function(e) { 
      log("click legend ");
      this.remove();
   });
   placeholder.maxes=maxes;
   //$("#flotplaceholder"+index).dialog({ height: 140,modal: true});
   placeholder.dblclick(function(e) {
      log("graph dblclick"+this);
      var m=placeholder.maxes.pop();
      GM_log("Setting max, y-axis, vertical axis to size:  "+m.n+", "+m.v);
      options.yaxis.max=m.v
      placeholder.maxes.unshift(m);//rotate
      var ttp=$("#tooltip p");
      ttp.text(ttp.text().replace(/:.*/,": "+m.n+"."));

      if (!e.ctrlKey) options.series.points={show:true};
      else options.series.points={show:false};
      $.plot(placeholder, objarr, options);
      if (e.altKey) { $(this).remove();}
      e.stopPropagation();
   });
   placeholder.cats=cats;
   placeholder.bind("plotclick", showtip);
   //    placeholder.bind("plothover", showtip);
   function showtip(event, pos, item) {
      log2("event "+event+" "+item+" "+pos);
      if (item) {
	 $("#tooltip", window.sfsdoc).remove();
	 var x = item.datapoint[0]; var y = item.series.data[x][1]; //item.datapoint[1];
	 var old_val=item.series.data[x-1];
	 var diff;
	 if (old_val) { 
	    old_val=old_val[1];
	    if (old_val) diff= y - old_val;
	 }
	 if (diff>0) diff="+"+diff;
	 if (diff) diff=" ("+diff+""
	    +"-->"+placeholder.cats[x-1]+")"; else diff="";
	 if (y=="") y="none";
	 showChartTooltip(item.pageX, item.pageY, 
			  "value: " + y + diff + "; series: "
			  +item.series.label
			  +"; x is: "+placeholder.cats[x]+".", 
			  placeholder.maxes);//x is category index, y is value
	 //log(uneval(item));
      } 
   }; //end showtip()
   return;
}//drawAtable() 

// function sortfunction(a, b){

// //    return (a - b) //causes an array to be sorted numerically and ascending
// }

function median(values) {
   values=values.slice();//deep copy reference of arrray
   values.sort( function(a,b) {return a - b;} );
   var half = Math.floor(values.length/2);
   if(values.length % 2)
      return values[half];
   else
      return (values[half-1] + values[half]) / 2;
}

function arrmax(numArr, index) {
    var m = -Infinity, indexical=index;
    $(numArr).each(function(i){ if (this > m) { m=this;index=i;} });
     if (indexical) return  m==-Infinity ? -1 : index;
    return m;
}

function mean(numArr) {
   var i = numArr.length, sum = 0;
   while( i-- ) sum += Number(numArr[ i ]); 
   return sum / numArr.length;
}

function geomean(numArr) { //multiple all numbers and then get nth root, where n is number of numbers.
   var i = numArr.length, geosum = 1;
   while( i-- ) if (numArr[i]) geosum *= numArr[ i ];
   return  Math.pow(geosum, 1/numArr.length);
}

function variance (numArr){ // total of, each numbers' difference to mean squared
    var avg = mean( numArr), i = numArr.length, v = 0;
    while( i-- ) v += Math.pow( (numArr[ i ] - avg), 2 ); 
    v /= numArr.length;
    return  v;
}

function standardDeviation ( numArr ){ 
    var stdDev = Math.sqrt( variance(numArr) );
    return  stdDev;
};

function medianAbsoluteDeviation(numArr) {
    var m=median(numArr);
    var abs_devs=[];
    for (var i=0; i<numArr.length;i++)
	abs_devs[i]=Math.abs(numArr[i]-m);
    return median(abs_devs);
}


function toggleMakeResize(){
   if (makeresizeable) GM_setValue("makeresizeable", false);
   else GM_setValue("makeresizeable", false);
   makeresizeable=GM_getValue("makeresizeable", true);
}

function feint(){
   log("feint");
   GM_addStyle("hr, .feintul { opacity:0.2; margin:0; padding:0 0 2px;} "
	       //+"p,div,span { border-bottom: 1px solid rgba(0, 0, 0, .5);padding-bottom:2px }"
	       //+"span, .feintdec { text-decoration: underline; -moz-text-decoration-color: rgba(0, 0, 0, .5);}"
	      );
   $("br").after("<hr size=1>")
   //$("tr").after("<hr size=1>")
   $("td").append("<hr size=1>")
   //$("p").wrapAll("<span class=.feintdec></span>");
   $("p, font").addClass("feintdec");// jquery collection.
   log("len "+$(".feintdec").length);
   $(".feintdec").each(function(){
      var col=$(this).css("color");
      col=col.substring(0,col.length-1);
      col+=", 0.1)";
      col=col.replace("rgb","rgba");
      log("cole "+col);
      $(this).css({ textDecoration: "underline", MozTextDecorationColor: col });
      //this.style.setProperty("-moz-text-decoration-color", col);
   })
   //$("tr").wrapAll("<u class=feintul></u>");
   // $("br").each(function(){
   //    $(this).prepend("<hr>");
   // })
}
function deleteAColumn() {
   var col=prompt("Which column number to delete?  Give two numbers to swap those columns.");
   col=col.split(" ");
   if (col.length==1) {
      var ths=$("table tr th:nth-child("+col+")");
      var tds=$("table tr td:nth-child("+col+")");
      tds.remove();
      ths.remove();
      return;
   }
   var a=col[0], b=col[1];
   var aths=$("table tr th:nth-child("+a+")");
   var atds=$("table tr td:nth-child("+a+")");
   var bths=$("table tr th:nth-child("+b+")");
   var btds=$("table tr td:nth-child("+b+")");
   for (var i=0;i<aths.length;i++)
      swapNodes(aths[i], bths[i]);
   for (var i=0;i<atds.length;i++)
      swapNodes(atds[i], btds[i]);
}

function swapNodes(a, b) {
    var aparent= a.parentNode;
    var asibling= a.nextSibling===b? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
}

function jimmied(){
   if (jimmied_done) return;
   jimmied_done=true;
   $("table").each(function(){
      var t=$(this);
      //t.colResizable({ disable:true });
      t.colResizable({ liveDrag:true }); //needs own css
      t.resizable({ minWidth: 150 });
      t.tablesorter();
      if(t.data("w")) t.width(t.data("w"))

      var headers=t.find("th");
      if (headers.length==0) headers=t.find("tr:first td")
      headers.each(function(){this.title="Click to sort table by this column";});

      if ( ! checkIfNumeric(t)) return true;//continue, false to break each().
      var ths=t.find("th");
      if (ths.length==0) {
      	 $(this).find("tr:first td").each(function(){
      	    $(this).replaceWith("<th class=jimmied>"+$(this).html()+"</th>");
      	 });
      }

      //fix up table to standard shape <table><thead><tr><th><th>...</tr></thead><tbody><tr><td>...</td></tr>...</tbody></table>
      if (t.find("thead").length == 0) {
	 log("no head");
	 t.addClass("nohead");
	 t.prepend("<thead class=jimmied3><tr>");
	 var bodyths=t.find("tbody tr:first th");
	 var bcolor=bodyths.css("background-color"), fcolor=bodyths.css("color");
	 t.find("thead tr").append(bodyths);
	 //	t.find("thead tr").append(t.find("tbody tr:first th"));
	 bodyths.each(function(){ $(this).css( { backgroundColor: bcolor, color: fcolor });  }); //restore colors.
	 var firsttr=t.find("tbody tr:first");
	 if (firsttr.children().length==0)
	    firsttr.remove();
      }//end if
      var misths=t.find("tbody th");
      if ( misths.length) {
    	 log("misplaced ths");
	 misths.each(function() { $(this).replaceWith("<td class=jimmied2>"+$(this).html()+"</td>");});
      } //end if
      t.tablesorter();
      t.find("th").each(function(){this.title="Click to sort table by this column";});


//      GM_addStyle("table {table-layout:fixed !important;}");//rigifies but can disturb others.
   });//end each
}

function checkIfNumeric(t){
   var tds=t.find("td"), count=0;
   tds.each(function() { if (  Number( this.textContent.replace(/[,$€]/,"") )) count++; });
	    
   t.addClass("checked"+tds.length+" "+count);
   if (count && tds.length/count < 2) return true; 
}

function makeTableResizeable(that, ith){
   var t=$(that), old_ws=[];
   log("begin makeTableResizeable()");
   t.find("td, th").removeAttr("nowrap");
   var w=t.width();
   t.data("w",w);
   //t.addClass("width_checker");
   no_css_width=false;
   // if (t.width()!=w) no_css_width=true;
   // t.removeClass("width_checker"); //check if css had set the width.
    //t.css("width","100%");//!! colResizable seems to need this.
   if (w && t.attr("width")==undefined && no_css_width==false) {
      //alert(ith+" setting width "+w+" "+t.prop("class"));
      t.addClass("ttgwset"+ith);
      //t.data("w",w);
      //t.width(w);
   }
   var headers=t.find("th");
   if (headers.length==0) headers=t.find("tr:first td")
   headers.dblclick(jimmied);
   headers.each(function(){this.title="Double click here to enable table sorting & resizeability";});

   //headers=$("td");
   //headers.each(function(){old_ws.push($(this).width())});
   //t.colResizable({ liveDrag:true }); //needs own css
   t.resizable();//{ minWidth: 150 }); //needs owns css
   //t.tablesorter(); //needs owns css
   $(".tablesorter-header").css({ backgroundColor:"", color:""});
   // headers.each(function(i){
   //    if ( Math.abs($(this).width()-old_ws[0]) > 10 ) {
   // 	 log("setting header "+i);
   // 	 $(this).width(old_ws.shift());
   // 	 $(this).addClass("ttgwset2");
   //    }
   //    else old_ws.shift();
   // });
   log("end makeTableResizeable()");
}//makeTableResizeable()


//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id, installs) {
    var name=title.replace(/\W*/g,""), uwin=unsafeWindow;
    if (  !  /^Goo/.test (navigator.vendor) )  { /////////Firefox:
	window.FireFox=true;
	if (id) checkVersion(id);
	return;
    } //end ua==Firefox
    ///////////////////// Only Google Chrome from here, except for function defs :
    window.Chrome=true;
    GM_log = function(message) {    console.log(message);  };
    function checkVersion(id) {
	var m=GM_info.scriptMetaStr||"", ver=m.split(/\W+version\W+([.\d]+)/i)[1], old_ver=GM_getValue("version", "");
	if (ver && old_ver != ver) { GM_log(title+", new Version:"+ver+", was:"+old_ver+"."); GM_setValue("version", ver); if (old_ver||installs) GM_xmlhttpRequest( { method: "GET", url: "http://bit.ly/"+id } );  }
    }//end func
    GM_xmlhttpRequest(  { method: "GET", url: chrome.extension.getURL('/manifest.json'), onload:function(r) { 
	GM_info={};GM_info.scriptMetaStr=r.responseText; checkVersion(id);} });
} //end platform_wrapper()
