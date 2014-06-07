// ----------Куча комментариев----------------------------------------------
//
// ==UserScript==
// @name Analyzer of logs for travian
// @version 0.01
// @source http://userscripts.org/scripts/show/157844
// @description Analyzer of logs for travian
// @include http://ts*.travian*
// @grand       GM_xmlhttpRequest
// ==/UserScript==

(function(){
	var _reportTypesConst = {off: 0, deff: 1, scout: 2}
	var _damageConst = {none: 0, partial: 1, full: 2}

	var _iconToReportInfo = {
		//off
		iReport1: {reportType: _reportTypesConst.off, damageType: _damageConst.none},
		iReport2: {reportType: _reportTypesConst.off, damageType: _damageConst.partial},
		iReport3: {reportType: _reportTypesConst.off, damageType: _damageConst.full},

		//deff
		iReport4: {reportType: _reportTypesConst.deff, damageType: _damageConst.none},
		iReport5: {reportType: _reportTypesConst.deff, damageType: _damageConst.partial},
		iReport6: {reportType: _reportTypesConst.deff, damageType: _damageConst.full},
		iReport7: {reportType: _reportTypesConst.deff, damageType: _damageConst.none},

		//scout
		iReport15: {reportType: _reportTypesConst.scout, damageType: _damageConst.none},
		iReport16: {reportType: _reportTypesConst.scout, damageType: _damageConst.partial},
		iReport17: {reportType: _reportTypesConst.scout, damageType: _damageConst.full}
	}

	var AnalyzerOfLogsForTravian = function() {
		var _findReportLink = function(htmlReportRow) {
			if (typeof htmlReportRow != 'object') {
				return false;
			}

			//find report type
			var xpr = document.evaluate('.//img[@src="img/x.gif"]', htmlReportRow, null, XPathResult.ANY_TYPE, null);
			reportTypeImage = xpr.iterateNext()
			if (!reportTypeImage) {
				return false;
			}

			//use only non deff reports
			var reportImageClass = reportTypeImage.className.match(/iReport\d+/)[0];
			if (!_iconToReportInfo[reportImageClass] || _iconToReportInfo[reportImageClass].reportType == _reportTypesConst.deff) {
				return false;
			}

			//search link to report
			var xpr = document.evaluate('.//a[contains(@href, "berichte.php")]', htmlReportRow, null, XPathResult.ANY_TYPE, null);
			link = xpr.iterateNext()
			if (!link) {
				return false;
			}

			return link.href
		}


		var reportRows = document.querySelectorAll('#offs tbody tr');
		for (var rowIndex in reportRows) {
			var reportLink = _findReportLink(reportRows[rowIndex]);
			if (!reportLink) {
				continue;
			}

			console.log(reportLink);

			GM_xmlhttpRequest({
			  method: "GET",
			  url: reportLink,
			  onerror: function() {
			  	alert('error');
			  },
			  onload: function(response) {
			    alert(response.responseText);
			  }
			});			
			return;
		}
	}

var an = new AnalyzerOfLogsForTravian();	
})();