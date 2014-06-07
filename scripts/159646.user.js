// ==UserScript==
// @name        SeekJobs
// @namespace   http://www.nowitworks.eu/SeekJobs
// @description Filter-out known agencies
// @include     http://www.seek.*/JobSearch*
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @grant GM_log
// @version     5
// @icon 		http://www.seek.co.nz/favicon4.ico
// ==/UserScript==

var defaultBlackList = [
    "2XM",
    "Absolute IT",
    "Acorva Technical Recruitment",
    "Acumen Consulting",
    "Adaps",
    "Adecco Personnel",
    "Adroit People",
    "Agile People",
    "Ajilon",
    "alcami",
    "Alchemy Consulting",
    "Alexander James",
    "Allerton Recruitment",
    "Alpha Recruitment",
    "Ambition Technology",
    "Apex Resource Solutions",
    "Arc Recruitmen",
    "Ashdown Consulting PTY Limited",
    "Attribute Consulting",
    "Aurec",
    "Australasian Recruitment Company",
    "Australian Fifty Leaders Pty Ltd",
    "Babcock",
    "Balance Recruitment",
    "Beyond Services",
    "BITE CONSULTING LIMITED",
    "Blackcat Consulting",
    "BlackOcean Recruitment",
    "Bluestone Recruitment",
    "Brand Developers",
    "Bridge Associates APAC Pty Ltd",
    "BSI People",
    "Calibrate Recruitment",
    "Callaways",
    "Candle",
    "Capital Recruitment",
    "Career Team Limited",
    "Careers New Zealand",
    "Carmichael Fisher (NSW) Pty Ltd",
    "Charterhouse",
    "CIH Consulting",
    "CITI Recruitment - Voted SARA's Winner, IT Small Recruiter 2012",
    "Command Group Pty Ltd",
    "Comspek International",
    "Consultus Recruitment & Research NZ Ltd",
    "CP IT Solutions",
    "Crackerjacks",
    "Cubic Resource",
    "Customise Consulting Group",
    "Data#3 Limited",
    "De Winter",
    "Dimension Data",
    "Drake International",
    "Dynamo Recruitment",
    "EBR",
    "ecareer employment services",
    "EDT Global Pty Ltd",
    "Elisjones & Associates P/L",
    "Enterprise Recruitment",
    "Evoke Consulting",
    "Evolution Group",
    "Farrow Jamieso",
    "Flintfox International",
    "Fluid Recruitment",
    "Focus Recruitment",
    "Frog Recruitmen",
    "Fuse IT Recruitment",
    "Fusion Transactive",
    "Gemteq Executive",
    "Genesis IT&T P/L",
    "Global Attract",
    "Global Career Link",
    "Green Light Australia Pty Ltd",
    "Greythorn",
    "GWG Partners",
    "H2R Consulting",
    "Halcyon Knights Pty Ltd",
    "Harvey Nash",
    "Hays",
    "HCM Australia",
    "High Street Recruitment",
    "HiTech Personnel",
    "Horizon Consulting",
    "Hudson",
    "Human Recruitment",
    "Huntel Global",
    "Huxley Associates",
    "Hydrogen Group Pty",
    "IBIT Solutions",
    "iCHGROUP",
    "iKas International Australia",
    "Infopeople",
    "Infotech Consulting",
    "INSIDE EXECUTIVE RECRUITMENT",
    "Inspire Recruitment Group Pty Limited",
    "Interlogic Placements P/L",
    "Interpro - NSW",
    "IT Consulting Associates Ltd",
    "IT Job Search Ltd",
    "IT Matters Recruitment - - Voted best",
    "IT Recruitment",
    "Jenkin Beattie",
    "Jobwire-Parramatta",
    "JP SOLUTIONS AUSTRALIA PTY LTD",
    "Kelly Executive",
    "Kinetic Recruitment",
    "Kings Resources P/L",
    "Launch Recruitment Pty Ltd",
    "Lawson Williams Consulting Group",
    "Live Executive",
    "Lloyd Executive",
    "Lucky You Found Me",
    "M&T Resources - Voted SARA's Favourite Medium IT Recruiter 2011 & 2012",
    "Madison Recruitment",
    "Manpower Professional Auckland",
    "Manpower Professional Christchurch",
    "MANTECH INTERNATIONAL SYSTEMS RECRUITMENT",
    "Match 2 Technical Ltd",
    "Match Executive",
    "MCS Consulting",
    "Metro Recruitment Ltd",
    "Michael Page Technology",
    "Miller Gold Search & Select",
    "Mind Recruitment",
    "Mindworx",
    "Mitchellake Consulting",
    "Morgan Campbell",
    "MPM Quality People",
    "MTR",
    "Naked Recruitment",
    "National Recruitment",
    "Naviro",
    "Network 20 Pty Ltd",
    "Nigel Frank International PTY LTD",
    "ninetwenty",
    "Orbital Recruitment Group",
    "OutSource",
    "Parker Bridge",
    "PBI Search",
    "People Group",
    "People Solutions",
    "people2people",
    "Peoplebank",
    "Peritus Recruitment Solutions",
    "Phoenix Executive Search",
    "Pinnacle IT",
    "Place Recruitment",
    "PM-Partners Group",
    "Portfolio Recruitment",
    "Potentia",
    "Power IT Consultancy Services",
    "PowerHouse People",
    "PRA",
    "Precision Sourcing",
    "Professional Continuity",
    "Pro-Perspective",
    "Protocol Personnel Services",
    "pursuIT",
    "QJumpers",
    "QPL Limited",
    "Radius Recruitment",
    "Radius Solutions Group",
    "Radley Group",
    "Randstad",
    "RANN IT",
    "razzbri",
    "RDBMS Resource Solutions",
    "Ready Willing and Able",
    "Recruit IT",
    "RecruitLoop Pty Ltd",
    "Red Rock Consulting",
    "Respect-Search and Selection",
    "Robert Half Technology",
    "Robert Walters",
    "Rookie Recruits",
    "Round Peg",
    "S2M",
    "salt",
    "Sead",
    "SearchWorks Ltd",
    "SGS Consulting",
    "Sinclair Recruitment",
    "SIRIUS TECHNOLOGY part of the Sirius Recruitment Group",
    "Skillquest",
    "Skillsearch Contracting Pty Ltd",
    "Spark IT",
    "Stellar Consulting Group Limited",
    "SustainAbility Consulting",
    "Sway Recruitment",
    "Talent International",
    "Talent Magnet",
    "Talent Propeller",
    "Talent Vault",
    "TalentID Leaders Pty Ltd",
    "TalentPoint",
    "Talon Group",
    "Tardis Group",
    "Texel",
    "TRA Global",
    "TRC Group",
    "TRS - Advertising & Media",
    "TRS - IT & Communications",
    "Ultimate Recruitment Corporation",
    "Vantage Recruitment",
    "Velocity Recruitment",
    "Verve Recruitment"
]; 

var blackList = defaultBlackList;
var storedBlackList=localStorage.getItem('SeekBlackList');
if(!storedBlackList){localStorage.setItem('SeekBlackList', JSON.stringify(defaultBlackList));}
else {blackList = JSON.parse(storedBlackList);}

var blackMap={};
blackList.forEach ( function(s) {blackMap[s.toLowerCase()]=true;} ); 

var visibleStyle = '.recruiterAd { display : block;}';
var invisibleStyle = '.recruiterAd { display : none;}';
var recruiterStyle = my_addStyle( document, invisibleStyle );

my_addStyle( document, ".seekJobs2controls { cursor: pointer; font-weight:bold; font-size:small !important; }" );

function logErr(err) {
	var txt="There was an error on this page at " + err.lineNumber + ".\n\n";
	txt+="Error description: " + err.message + "\n\n";
	console.log(txt);
}

function isAgent(name) {
	name = name.toLowerCase();
	//console.log(name);    
    return blackMap[name];
}

function addCheckbox()
{
	$(".worktype-refine").append('<dd><input id="showRecruiters" type="checkbox"><label for="showRecruiters">Show Recruiters</label></dd>');
    var cb = document.getElementById('showRecruiters');
	cb.onclick = showRecruiterAds;
    cb.checked = JSON.parse(localStorage.getItem('showRecruiters'));
}

function processPage()
{
    try{
        $(".seekJobs2controls").remove();
        $(".recruiterAd").removeClass("recruiterAd");
        
        $(".mod-searchresult-entry").each(
            function(index,el)
            {
                var pel=this;

                $(el).find('em').each(
                    function (i,eli)
                    {
                        var advertiser=$(this).text();
                        var linkId='sj_'+index;
                        var isRecruiter=isAgent(advertiser);
                        
                        if(isRecruiter){
                            
                            $(pel).addClass('recruiterAd');
                            $(this).append('<span class="seekJobs2controls"> <a class="seekJobs2controls" id="'+linkId+'">unblock</a></span>');                           
                        }
                        else 
                        {
                            $(this).append('<span class="seekJobs2controls"> <a class="seekJobs2controls" id="'+linkId+'">block</a></span>');
                        }
                        
                        var linkEl= document.getElementById(linkId);
                        if(isRecruiter) {linkEl.onclick = function(e){unblockAdvertiser(advertiser);};}
                        else {linkEl.onclick = function(e){blockAdvertiser(advertiser);};}
                    }
                );
            }
        );
        
        showRecruiterAds();
	} 
	catch(err) {
		logErr(err);
	}
}

if (document.body) {
    addCheckbox();
	processPage();
}

function blockAdvertiser(name)
{
    name=name.toLowerCase();
    blackMap[name]=true;
    blackList.push(name);
    blackList.sort();
    localStorage.setItem('SeekBlackList', JSON.stringify(blackList));
    processPage();
}

function unblockAdvertiser(name)
{
    name=name.toLowerCase();
    delete blackMap[name];
    var index = blackList.indexOf(name);
    blackList.splice(index, 1);
    blackList.sort();
    localStorage.setItem('SeekBlackList', JSON.stringify(blackList));
    processPage();
}

function showRecruiterAds()
{
    var show = document.getElementById('showRecruiters').checked;
    localStorage.setItem( 'showRecruiters', show );
    recruiterStyle.textContent = show==true?visibleStyle:invisibleStyle;
}

function my_addStyle(doc, css) {
  var head = doc.getElementsByTagName("head")[0];
  if (head) {
    var style = doc.createElement("style");
    head.appendChild(style);
    style.textContent = css;
    style.type = "text/css";

    return style;
  }
  return null;
}