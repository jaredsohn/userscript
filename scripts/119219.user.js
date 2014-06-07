// ==UserScript==
// @name           Easy Monitoring
// @version        0.4
// @description    Easy Monitoring
// @include        https://services.ptcmysore.gov.in/accountsmis/
// @include        https://services.ptcmysore.gov.in/accountsmis
// @include        https://services.ptcmysore.gov.in/accountsmis/Default.aspx
// @include        https://services.ptcmysore.gov.in/accountsmis/MIS/ReportViewer.aspx?report=PAofficewise
// ==/UserScript==

(function(){

// 	For Accounts MIS Login
	if(document.URL == 'https://services.ptcmysore.gov.in/accountsmis/' ||
	document.URL == 'https://services.ptcmysore.gov.in/accountsmis') {
		document.getElementById('txtusername').value = 'dop';
		document.getElementById('txtpassword').value = 'accts';
		document.getElementById('btnlogin').click();
	}


//	Redirecting to Project Arrow -> Offices
	if(document.URL == 'https://services.ptcmysore.gov.in/accountsmis/Default.aspx') {
		window.location = 'https://services.ptcmysore.gov.in/accountsmis/MIS/ReportViewer.aspx?report=PAofficewise';
	}

//	Selection
	if(document.URL == 'https://services.ptcmysore.gov.in/accountsmis/MIS/ReportViewer.aspx?report=PAofficewise') {
		if(document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl03_ddValue').value == 0) {
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl03_ddValue').selectedIndex = 7
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl03_ddValue').onchange();
		}

		if(document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl03_ddValue').value == 7 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl05_ddValue').value == 0) {
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl05_ddValue').selectedIndex = 2
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl05_ddValue').onchange();
		}

		if(document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl03_ddValue').value == 7 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl05_ddValue').value == 2 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl07_ddValue').value == 0) {
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl07_ddValue').selectedIndex = 9
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl11_ddValue').selectedIndex = 9
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl13_ddValue').selectedIndex = 2

			var t = new Date();
			var tdate = new String();
			var month = t.getMonth() + 1;
			var day = t.getDate();
			var year = t.getFullYear();
			tdate = month + "/" + day + "/" + year;
			document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl09_txtValue').value = tdate;
		}
		
		if(document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl03_ddValue').value == 7 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl05_ddValue').value == 2 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl07_ddValue').value == 9 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl11_ddValue').value == 9 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl13_ddValue').value == 2 &&
		document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl09_txtValue').value != 0) {

			var docElement = document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl01_ctl05_ctl00');
			if (docElement == null) {
				document.getElementById('ctl00_ContentPlaceHolder1_ReportViewer1_ctl00_ctl00').click();
			}
		}

	}
})();
