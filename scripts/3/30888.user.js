// ==UserScript==
// @name           Dave's ESL Cafe - Nix Korean Recruiters
// @namespace      http://www.dmitryvolokhov.com
// @description    Removes some recruiter job listings on Dave's Korean Job Board 
// @include        http://www.eslcafe.com/jobs/korea/
// ==/UserScript==
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− 
// 
// This is a Greasemonkey user script. 
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/ 
// Then restart Firefox and revisit this script. 
// Under Tools, there will be a new menu item to "Install User Script". 
// Accept the default configuration and install. 
// 
// To uninstall, go to Tools/Manage User Scripts, 
// select "Hello World", and click Uninstall. 
// 
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− 
// 
//************* List of Recruiters to Remove *************//
var recruiters = new Array();
recruiters[0] = "LongBridge Pacific";
recruiters[1] = "KIMS-KOREA";
recruiters[2] = "OK Recruiting";
recruiters[3] = "JobInKorea";
recruiters[4] = "ILoveKorea";
recruiters[5] = "EnglishWork.com";
recruiters[6] = "WorknPlay";
recruiters[7] = "People Recruit";
recruiters[8] = "English Cruiser";
recruiters[9] = "eduorange";
recruiters[10] = "ESL Job Network";
recruiters[11] = "ESL JOBS KOREA";
recruiters[12] = "CnG ESL Recruiting";
recruiters[13] = "ACE Career";
recruiters[14] = "Kim & Joe";
recruiters[15] = "Aclipse";
recruiters[16] = "Think Outside";
recruiters[17] = "YouniKorea";
recruiters[18] = "Welcome Recruit";
recruiters[19] = "ATOP Recruiting";
recruiters[20] = "Findateacher";
recruiters[21] = "ESL Communications";
recruiters[22] = "Teach Away";
recruiters[23] = "Canadian Connection";
recruiters[24] = "Korvia";
recruiters[25] = "English Teaching Network";
recruiters[26] = "Go East Recruiting";
recruiters[27] = "Korea Global Connections";
recruiters[28] = "JUN Education";
recruiters[29] = "ThinkOutSide";
recruiters[30] = "SeoulESL Recruiting";
recruiters[31] = "Hotjobkorea";
recruiters[32] = "Koreaconnections";
recruiters[33] = "ESL TEACHER RECRUITER";
recruiters[34] = "jobe2line";
recruiters[35] = "Risingenglish";
recruiters[36] = "ASN International";
recruiters[37] = "ASK Now Inc";
recruiters[38] = "RBI";
recruiters[39] = "Korean Horizons";
recruiters[40] = "ESL PLANET";
recruiters[41] = "Footprints";
recruiters[42] = "ESL AGENT";
recruiters[43] = "Solon Holdings";
recruiters[44] = "ATOP";
recruiters[45] = "Korea Education Network";
recruiters[46] = "People Recruit";
recruiters[47] = "Maple Recruiting";
recruiters[48] = "I LOVE ESL";
recruiters[49] = "Korean Horizons";
recruiters[50] = "GSMC Recruiting";
recruiters[51] = "ESL Agent";
recruiters[52] = "JUNEDUCATION";
recruiters[53] = "T4U";
recruiters[54] = "Apex Recruitment";
recruiters[55] = "TENET";
recruiters[56] = "BopKorea";
recruiters[57] = "English House Recruiting";
recruiters[58] = "Asia-Pacific Connections";
recruiters[59] = "JE Consulting";
recruiters[60] = "ESLAGENT";
recruiters[61] = "BCM Educational";
recruiters[62] = "ESL Dream";
recruiters[63] = "GET2Korea";
recruiters[64] = "Korean Horizon";
recruiters[65] = "ESL Communication";
recruiters[66] = "English Barn";
recruiters[67] = "Fun English --";
recruiters[68] = "EZE English";
recruiters[69] = "Rising Sun";
recruiters[70] = "EDRA";
recruiters[71] = "Park English";
recruiters[72] = "TESLJOBKOREA";
recruiters[73] = "GMSC";
recruiters[74] = "Englishcruiser";
recruiters[75] = "MnJ";
recruiters[76] = "ybmb2b";
recruiters[77] = "ESL-Park";
recruiters[78] = "ELC Edu";
recruiters[79] = "ETJ Korea";
recruiters[80] = "WORLDESL";
recruiters[81] = "ESL Consulting";
recruiters[82] = "Koreapot";
recruiters[83] = "Advanced Recruiting";
recruiters[84] = "Planet ESL";
recruiters[85] = "HOT JOB KOREA --";
recruiters[86] = "TEK Service";
recruiters[87] = "Champion ESL";
recruiters[88] = "eslstarter";
recruiters[89] = "Injoong";
recruiters[90] = "Lydia Recruiters";
recruiters[91] = "Korealinx";
recruiters[92] = "In The World";
recruiters[93] = "TJ International";
recruiters[94] = "Jeju ESL";
recruiters[95] = "Community Korea ";
recruiters[96] = "World English Service";
recruiters[97] = "AMS Korea";
recruiters[98] = "_____________";
recruiters[99] = "_____________";
recruiters[100] = "_____________";

//************* End List of Recruiters to Remove *************//

var numRecruitersHidden = 0;

Cells = document.getElementsByTagName("dd");

for (var i=0;i<Cells.length;i++)
{
	Cell = Cells[i];
	
	for (var j=0;j<recruiters.length;j++)
	{
		var recruiterName = recruiters[j];
		if (Cell.textContent.toLowerCase().indexOf(recruiterName.toLowerCase()) >= 0 )
		{
			//alert("Attempting to hide " + recruiterName.toLowerCase());
			numRecruitersHidden++;
			Cell.style.display = "none";
			break;
		}
	}	
}
//************* End Remove Recruiters *************//

document.title = "Dave's ESL Cafe Enhanced Korean Job Board - " + numRecruitersHidden + " Recruiter Postings Hidden";