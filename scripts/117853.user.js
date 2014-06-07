// ==UserScript==
// @name           Route Y links on the BYU Home Page
// @namespace      joeyhewitt
// @description    Take back your (old) BYU Home Page; bring those Route Y links back to their proper place.
// @match          http://home.byu.edu/home/old/
// @match          https://home.byu.edu/home/old/
// @version        1.1
// ==/UserScript==

// https://gist.github.com/437513
(function(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://www.byu.edu/js/jquery/latest/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
})(function() {


    // if this isn't initialized, we'll fail. I think it's only a problem in Greasemonkey
    if (!byu.menu.level2Container) {
        window.setTimeout(arguments.callee, 75);
        return;
    }


    /*
     * Run this in MyBYU to scrape links out
(function($) {
var menus = {};
$('#launcherTree>li').each(function(i, el) {
	var $li = $(el);
	var name = $li.children('.folder').text();
	menus[name] = $.makeArray($li.find('ul>li>.file>a').map(function(i, el) {
		var $link = $(el);
		return [[$link.text(), $link.attr('href')]];
	}));
});
return JSON.stringify(menus); })(up.jQuery);
     */
var menus = {"Communication":[["BYU Online Directory","https://gamma.byu.edu:443/ry/ae/prod/person/cgi/personLookup.cgi"],["Directory (Alumni)","http://alumni.byu.edu/s/1085/03-provo-Alumni/index.aspx?sid=1085&gid=7&pgid=6&cid=41"],["E-mail Alias Manager","https://home.byu.edu:443/ry/webapp/eam/app"],["Login Summary","https://y.byu.edu:443/ry/ae/prod/user_help/cgi/loginSummary.cgi"],["My IP Phone","https://home.byu.edu/ry/webapp/myipphone/app"],["Personal Information","https://y.byu.edu/ry/ae/prod/person/cgi/personSummary.cgi"],["Student Voting","https://vote.byu.edu"]],"Miscellaneous":[["Campus IP Television","https://it.byu.edu/byu/help.do?&sysparm_document_key=kb_knowledge,917b74260a0a3c5400ce194439a28e6b"],["Career Services - eRecruiting","https://byu.experience.com"],["Change Password","https://gamma.byu.edu:443/ry/ae/prod/person/cgi/changePassword.cgi"],["IT Tracker","https://it.byu.edu/byu/my_incidents.do"],["Intl Study Prgms App Status","https://home.byu.edu:443/ry/webapp/isp/app"],["Off-Campus Housing","https://home.byu.edu:443/ry/webapp/och/"],["Online Locker Rental","https://home.byu.edu/webapp/lockerRental/studentDashboard.htm "],["Online Transcript Request","http://transcripts.byu.edu/"],["Parking Registration","https://home.byu.edu/webapp/traffic/vehicles/"],["Signature Card and Meal Plans","https://y.byu.edu:443/ry/ae/prod/signature_card/cgi/signature_card.cgi"],["Software Distribution","http://software.byu.edu"],["UTA Bus Pass","https://gamma.byu.edu/ry/ae/prod/person/cgi/utaPass.cgi"]],"School":[["AIM","https://y.byu.edu:443/ry/ae/prod/user_help/cgi/mainMenu.cgi"],["Apply for Graduation","https://y.byu.edu/ry/ae/prod/acad_plan/cgi/stdGraduationApp.cgi"],["Blackboard","https://blackboard.byu.edu"],["Gradebook","http://gradebook.byu.edu"],["Graduate School App Status","https://y.byu.edu:443/ry/ae/prod/graduate_admissions/cgi/gradAdmissionsStatus.cgi"],["My Book List","https://booklist.byu.edu:443/index.cfm"],["My Dining Account","https://sasapps.byu.edu/services/dining"],["My Financial Center","https://sa.byu.edu/psp/ps/EMPLOYEE/PSFT_SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL"],["My Housing Account","https://sasapps.byu.edu/services/main/default.aspx"],["MyMAP","https://home.byu.edu/webapp/mymap/welcome.htm"],["Online Transcript Request","http://transcripts.byu.edu/"],["Register for Classes","https://home.byu.edu/webapp/mymap/register.htm"],["Scholarship Application","https://y.byu.edu:443/ry/ae/prod/sch_apply/cgi/schStatus.cgi"],["Student Ratings","https://studentratings.byu.edu:443/"],["Student/Private Health Plans","https://sa.byu.edu/psp/ps/STUDENT/PSFT_SA/c/Y_STUDENT_HEALTH.Y_SHC_MY_HLTH_INFO.GBL"],["Syllabi","https://Syllabus.byu.edu"],["Testing Center","https://testing.byu.edu:443/"]],"Work":[["AIM","https://y.byu.edu:443/ry/ae/prod/user_help/cgi/mainMenu.cgi"],["BYU Compliance Hotline","https://secure.ethicspoint.com/domain/en/report_custom.asp?clientid=17652"],["BYU Marketplace","https://home.byu.edu/ry/webapp/sso/app?service=page/Eprocure"],["Class Rolls","https://y.byu.edu:443/ry/ae/prod/class_schedule/cgi/instructorSchedule.cgi"],["Direct Deposit","https://gamma.byu.edu/ry/ae/prod/customer_account/cgi/directDeposit.cgi"],["Faculty Profile System","https://facultyprofile.byu.edu: "],["Grad App Queue","https://y.byu.edu/ry/ae/prod/acad_plan/cgi/stdGradQueue.cgi"],["Grade Rolls","https://y.byu.edu/ry/ae/prod/grades/cgi/gradeSelection.cgi"],["Gradebook","http://gradebook.byu.edu"],["Group Access Admin","https://home.byu.edu/webapp/gro-web/"],["Human Resources/Payroll","https://hrms.byu.edu/psp/hr/EMPLOYEE/HRMS/h/?tab=DEFAULT"],["Imaging System","https://gamma.byu.edu:443/ry/ae/prod/imaging/index.html"],["Long Distance - Veracity","https://veracity.byu.edu:443/byu-ld.php"],["MyMAP","https://home.byu.edu/webapp/mymap/welcome.htm"],["University Org Chart","https://orgchart.byu.edu"],["University Policies/Procedures","http://policy.byu.edu"],["View Paycheck","https://hrms.byu.edu/psp/hr/EMPLOYEE/HRMS/c/ROLE_EMPLOYEE.PY_IC_PAY_INQ.GBL?NAVSTACK=Clear"],["W-2 View/Print, Consent","https://hrms.byu.edu/psp/ps/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE"],["Y-Expense","https://purchasing.byu.edu/expense/exp_main.asp "],["Y-Travel","https://home.byu.edu/webapp/sso/getthere/login.htm"],["YTrain","http://ytrain.byu.edu"]]};

        // this doesn't seem to really be necessary, but I may as well
        var firstLastify = function($menu) {
            $menu.children(':first').addClass('first');
            $menu.children(':last').addClass('last');
        };

        // build the Route Y menu
        var $routeYMenu = $('<ul class="menu" />');
        $.each(menus, function(name, items) {
            var $submenuWrapper = $('<li class="expanded" />').append(
                $('<a href="javascript:byu.none()" class="active" />').text(name)
            );
            var $submenu = $('<ul class="menu" />');
            $submenu.appendTo($submenuWrapper);
            $submenuWrapper.appendTo($routeYMenu);
            $.each(items, function(i, item) {
                var title = item[0];
                var href = item[1];
                var $item = $('<li class="leaf" />');
                $item.append($('<a />').attr('href', href).text(title));
                $submenu.append($item);
            });
            firstLastify($submenu);
        });
        firstLastify($routeYMenu);

        // change myBYU/Route Y to just myBYU
        $('#Level1').children('[href*="uPortal"]').text('myBYU');

        // append the Route Y Menu
        byu.menu.appendMenuItem('Route Y', $routeYMenu[0]);
                



});
