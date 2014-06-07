// ==UserScript==
// @name           SETH
// @namespace      http://www.simdynasty.com
// @description    The Simdynasty Enhancement THingy adds functionality to Simdynasty.com
// @include        http://simdynasty.com/*
// @include        http://*.simdynasty.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js
// @resource       uiCss    http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/themes/base/jquery-ui.css
// @version        1.0.3
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute("href", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/themes/base/jquery-ui.css");
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
    script.addEventListener('load', function() {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js");
	script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")(false);";
	    document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
    document.body.appendChild(stylesheet);
}

if (typeof $ == "undefined") {
    addJQuery(main);
} else {
    main(true);
}

function main(isGM) {
    calc=["Year", "Team", "WHIP", "ERA", "AVG", "OPS", "OBP", "SLG", "Awards"]; //what variables aren't simple totals
    rate =["WHIP", "ERA", "AVG", "OPS", "OBP", "SLG"];
    precs = {
	"IP": 2,
	"WHIP": 2,
	"ERA": 2,
	"AVG": 3,
	"OPS": 3,
	"OBP": 3,
	"SLG": 3
    }
    defPrec = 1;
    hoverColor="#7DDCE8";


    function clearSelection() {
	startYr=undefined;
	endYr=undefined;
	$(dataRows).not(":contains(Total)").each(function() {
	    resetBG($(this));
	});
	$("#SETH-clearYrs").text("");
    }

    function trueIP(ip) {
	return Math.floor(ip) + ((ip - Math.floor(ip))*10/3);
    }

    function dispIP(ip) {
	return Math.floor(ip) + ((ip - Math.floor(ip))*3/10);
    }

    function round(num,prec) {
	return Number(num).toFixed(Number(prec));
    }

    function setupAvgs(headers,totals,num,seasonAvgRow,gameAvgRow) {
	var gameMult;
	var isHitter = (gameAvgRow!=undefined);
	var seasonAvgData = {};
	var gameAvgData = {};

	$.each(headers,function(col) {
	    var txt = "";
	    if (isHitter)
		var gameTxt = "";
	    var prec = (precs[col]!=undefined ? precs[col] : defPrec)

	    if (col=="G" && isHitter) {
		gameMult = 162.0/totals["G"];
	    }
	    if (col=="IP") {
		var trueTotal = trueIP(totals[col]);
		txt=round(dispIP(trueTotal/num),prec);
	    } else if ($.inArray(col,calc)==-1) { //not calculated
		txt=round(Number(totals[col])/num,prec);
		if (isHitter)
		    gameTxt=round(Number(totals[col])*gameMult,prec);
	    } else if (col=="Year") {
		txt="<b>Season Avg</b>";
		if (isHitter)
		    gameTxt="<b>162 Game Avg</b>";
	    } else if ($.inArray(col,rate)!=-1) {
		txt=totals[col];
		if (isHitter)
		    gameTxt=txt;
	    }
	    seasonAvgData[col]=txt;
	    seasonAvgRow.append("<td>"+txt+"</td>");
	    if (isHitter) {
		gameAvgData[col]=gameTxt;
		gameAvgRow.append("<td>"+gameTxt+"</td>");
	    }
	});
	return {
	    seasonAvgData: seasonAvgData,
	    gameAvgData: gameAvgData
	};
    }

    function setBG(obj, color) {
	if (obj.data("prevBG")==undefined) {
	    obj.data("prevBG",obj.attr("bgcolor"));
	}
	obj.attr("bgcolor",color);
    }

    function resetBG(obj) {
	if (obj.data("prevBG")!=undefined) {
	    obj.attr("bgcolor",obj.data("prevBG"));
	    obj.removeData("prevBG");
	}
    }
    if (window.location.pathname.search(/\/player.jsp$/)!=-1) { //player
	if (window.location.search.search("mode=mini")==-1 &&
	    window.location.search.search("mode=teams")==-1 &&
	    (window.location.search.search("statsorimps=stats")!=-1 ||
		window.location.search.search("statsorimps")==-1)) { //stats view
	    if (isGM)
		$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+GM_getResourceURL("uiCss")+"\"");
	    $("body").append("<div id=\"SETH-dialog\"></div>");
	    var dialog=$("#SETH-dialog");
	    dialog.dialog({
		autoOpen: false
	    });
	    $(".ui-dialog-titlebar-close").hide();

	    var statTable = $(".stat-table");
	    var headersRow = $("tr:has(th)",statTable);
	    var totalsRow;
	    var seasonAvgRow;
	    var seasonAvgData = {};
	    var gameAvgRow;
	    var gameAvgData = {};
	    var headers = {};
	    var headersByIdx = [];
	    var isPitcher;

	    var startYr;
	    var endYr;

	    $("th",headersRow).each(function(i) {
		headers[$.trim($(this).text())] = i;
		headersByIdx[i] = $.trim($(this).text());
	    });
		
	    var dataRows = $("tr",statTable).not(":has(th)");
	    var data = {};
	    $(dataRows).each(function(row) {
		var yr = $($("td",this)[headers["Year"]]).text();
		if (yr=="Total") {
		    totalsRow=$(this);
		}
			
		data[yr]={};
		$("td",this).each(function(col) {
		    data[yr][headersByIdx[col]]=$.trim($(this).text());
		});
	    });
	    isHitter = ($.inArray("AB",headersByIdx)!=-1);

	    totalsRow.before("<tr bgcolor=\""+totalsRow.attr("bgcolor")+"\" id=\"SETH-seasonAvg\"></tr>");
	    seasonAvgRow=$("#SETH-seasonAvg");

	    if (isHitter) {
		totalsRow.before("<tr bgcolor=\""+totalsRow.attr("bgcolor")+"\" id=\"SETH-gameAvg\"></tr>");
		gameAvgRow=$("#SETH-gameAvg");
	    }

	    var retVal = setupAvgs(headers,data["Total"],dataRows.length-1,seasonAvgRow,gameAvgRow);
	    seasonAvgData = retVal.seasonAvgData;
	    gameAvgData = retVal.gameAvgData;
	    retVal=undefined;

	    statTable.after("<a href=\"javascript:void(0)\" id=\"SETH-clearYrs\"></a><br>");
	    $("#SETH-clearYrs").click(clearSelection);

	    $(dataRows).not(":contains(Total)").hover(function() {
		var yr = $("td:eq("+headers["Year"]+")",this).text();
		if (startYr==undefined || yr<startYr || endYr==undefined || yr>endYr) {
		    setBG($(this),hoverColor);
		}
	    },function() {
		var yr = $("td:eq("+headers["Year"]+")",this).text();
		if (startYr==undefined || yr<startYr || ((endYr==undefined || yr>endYr) && yr!=startYr)) {
		    resetBG($(this));
		}
	    }).children("td").not(":has(a)").click(function(e) {
		e.preventDefault();
		var row = $(this).parents("tr");

		var yr = $("td:eq("+headers["Year"]+")",row).text();
		if (startYr==undefined) {
		    startYr=yr;
		    setBG($(row),hoverColor);
		} else {
		    if (yr<startYr) {
			endYr=startYr;
			startYr=yr;
		    } else {
			endYr=yr;
		    }
		}
		$("#SETH-clearYrs").html("Clear selection");
		if (startYr!=undefined && endYr!=undefined) {

		    var yrs = [];
		    var totals = {};
		    $(dataRows).not(":contains(Total)").each(function() {
			var yr=$("td:eq("+headers["Year"]+")",this).text();
			if (yr >= startYr && yr <= endYr) {
			    setBG($(this),hoverColor);
			    yrs.push(yr);
			} else {
			    resetBG($(this));
			}
		    });

		    dialog.dialog("option", {
			"title": startYr+"-"+endYr,
			"height": 200,
			"width": 850
		    });
		    dialog.html("<table id=\"SETH-yrSubset\"></table>");
		    var subsetTable = $("#SETH-yrSubset");
		    subsetTable.append("<tr id=\"SETH-subsetHeader\"></tr>");
		    var subsetHeader = $("#SETH-subsetHeader");
		    subsetTable.append("<tr id=\"SETH-subsetTotals\"></tr>");
		    var subsetTotals = $("#SETH-subsetTotals");
		    var subsetGameAvg;
		    if (isHitter) {
			subsetTable.append("<tr id=\"SETH-subsetGameAvg\"></tr>");
			subsetGameAvg = $("#SETH-subsetGameAvg");
		    }
		    subsetTable.append("<tr id=\"SETH-subsetSeasonAvg\"></tr>");
		    var subsetSeasonAvg = $("#SETH-subsetSeasonAvg");

		    $(headersByIdx).each(function() {
			subsetHeader.append("<th>"+this+"</th>");
			totals[this]=0;
		    });

		    //calc totals
		    var lastTeam="";
		    $(yrs).each(function() {
			var yr=this;
			$(headersByIdx).each(function() {
			    if ($.inArray(this.toString(),calc)==-1) {
				if (this=="IP") {
				    totals[this]+=trueIP(data[yr][this]);
				} else {
				    totals[this]+=Number(data[yr][this]);
				}
			    } else if (this=="Team") {
				if (totals[this]=="") {
				    totals[this]=lastTeam=data[yr][this];
				} else if (data[yr][this]!=lastTeam) {
				    lastTeam=data[yr][this];
				    totals[this]+=","+lastTeam;
				}
			    }
			});
		    });
		    totals["Year"]=startYr+"-"+endYr;
		    totals["Awards"]="";
		    if (isHitter) {
			totals["AVG"]=round(totals["H"]/totals["AB"],3);
			totals["OBP"]=round((totals["H"]+totals["BB"]+totals["HBP"])/(totals["AB"]+totals["BB"]+totals["HBP"]+totals["SF"]),3);
			totals["SLG"]=round((totals["H"]+totals["2B"]+2*totals["3B"]+3*totals["HR"])/totals["AB"],3);
			totals["OPS"]=round(Number(totals["OBP"])+Number(totals["SLG"]),3);
		    } else { //pitcher
			totals["ERA"]=round(9*totals["ER"]/totals["IP"],2);
			totals["WHIP"]=round((totals["H"]+totals["BB"])/totals["IP"],2);
			totals["IP"]=round(dispIP(totals["IP"]),1);
		    }

		    setupAvgs(headers,totals,yrs.length,subsetSeasonAvg,subsetGameAvg);

		    //output
		    $(headersByIdx).each(function() {
			subsetTotals.append("<td>"+totals[this]+"</td>");
		    });

		    subsetTable.addClass("stat-table").addClass("playercard-stat-table");
		    $("tr",subsetTable).attr("bgcolor",totalsRow.attr("bgcolor"));

		    dialog.append("<a href=\"javascript:void(0)\" id=\"SETH-closeDialog\">Close</a>"+
			" | <a href=\"javascript:void(0)\" id=\"SETH-closeAndClear\">Close + Clear Selection</a>");
		    $("#SETH-closeDialog").click(function() {
			dialog.dialog("close");
		    });
		    $("#SETH-closeAndClear").click(function() {
			dialog.dialog("close");
			clearSelection();
		    });

		    dialog.dialog("open");
		}
	    });
	} //if stats view
    }
}