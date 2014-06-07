// ==UserScript==
// @name        AoPSHaxx: USA Contests
// @namespace   http://toematoe.iwizardpro.com/
// @description Organizes the USA Contests Section
// @include     http://www.artofproblemsolving.com/Forum/resources.php?c=182*
// @version     1
// @grant	none
// ==/UserScript==

/*
 * Written by v_Enhance
 * The file may be distributed physically or electronically, in whole or in part,
 * but for and only for non-commercial purposes.
 * This file may be edited freely, as long as this notice remains intact.
 * Obviously, there is no warranty.
 */


// Abbreviation/Category list {{{1
TRANSLATE = new Object();
// This contains mappings from the full contest names to abbreviated names that will be displayed.
// Usage should be self-explanatory.
TRANSLATE["USA TSTST"] = "TSTST";
TRANSLATE["Harvard-MIT Mathematics Tournament"] = "HMMT";
TRANSLATE["Stanford Mathematics Tournament"] = "SMT";
TRANSLATE["Princeton University Math Competition"] = "PUMaC";
TRANSLATE["U.S National Chemistry Olympiad"] = "USAChO";
TRANSLATE["NIMO Summer Contest"] = "NIMO Summer";

// Create the miscellaneous category, which accepts any contest.
CAT_MISC = new Category("Other Contests", []);
CAT_MISC.hasMember = function(s) { return true; }
CAT_MISC.addContest = function(c) { this.contests.push(c); }

// This is a list of all categories.
ALL_CATEGORIES = new Array(
		new Category("USAMO", [
			"Team Selection Test",
			"USA TSTST",
			"AIME",
			"USAMO",
			"USAJMO",
			"AMC 8",
			"AMC 10",
			"AMC 12/AHSME",
		]),
		new Category("Student's Contests", [
			"ELMO",
			"ELMO Shortlist",
			"NIMO",
			"NIMO Summer Contest",
			"Online Math Open",
		]),
		new Category("College Tournaments", [
			"Harvard-MIT Mathematics Tournament",
			"Princeton University Math Competition",
			"Stanford Mathematics Tournament",
		]),
		new Category("Science Contests", [
			"U.S National Chemistry Olympiad",
			"F = Ma",
			"USAPhO Quarterfinals",
			"USAPhO",
		]),
		CAT_MISC
	);
// }}}



// Retrieves GET variables from URL, when appropriate.
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return "";
}

// Basic class for a contest
function Contest() {
	this.toString = function() { return "<a href=\"" + this.url + "\"><b>" + this.name + "</b></a>"; }
}

// Class for a category
function Category(arg_name, arg_contest_names) {
	this.name = arg_name;
	this.contest_names = arg_contest_names;
	this.contests = new Array(this.contest_names.length);
	this.hasMember = function(s) { return (this.contest_names.indexOf(s) != -1); }
	this.addContest = function(c) { this.contests[this.contest_names.indexOf(c.name)] = c; }
	this.toString = function() {
		var out = "<h4>" + this.name + "</h4><ol>\n";
		for (var i=0; i<this.contests.length; i++) {
			out += "<li>" + this.contests[i].toString() + "</li>\n";
		}
		out += "</ol><br>";
		return out;
	}
}

function main() {
	// If we are actually inside a contest, then quit.
	if (getQueryVariable("cid") != "") { return; }
	
	var contest_tds = document.getElementsByClassName("transp_border");
	for (var i=0; i<contest_tds.length; i++) {
		var this_td = contest_tds[i];
		var this_contest = new Contest();
		// Extract data from <td> element.
		this_contest.name = this_td.getElementsByTagName('b')[0].innerHTML;
		if (this_td.getElementsByTagName('b').length == 3) {
			this_contest.num_problems = this_td.getElementsByTagName('b')[1].innerHTML;
			this_contest.num_years = this_td.getElementsByTagName('b')[2].innerHTML;
		}
		else {
			this_contest.num_problems = 0;
			this_contest.num_years = 0;
		}
		this_contest.url = this_td.getElementsByTagName('a')[0].href;

		// Throw into a category.
		for (var j=0; j<ALL_CATEGORIES.length; j++) {
			var this_cat = ALL_CATEGORIES[j];
			if (this_cat.hasMember(this_contest.name)) {
				this_cat.addContest(this_contest);
				break;
			}
		}

		// Check to see if we need to translate.
		for (var k in TRANSLATE) {
			if (!TRANSLATE.hasOwnProperty(k)) { continue; }
			if (this_contest.name == k) {
				this_contest.name = TRANSLATE[k];
			}
		}

	}

	// Inject element into main page.
	var target = document.getElementsByClassName("row2")[0];
	for (var j=0; j<ALL_CATEGORIES.length; j++) {
		var this_cat_elm = document.createElement("span");
		this_cat_elm.style.display = "inline-block";
		this_cat_elm.style.verticalAlign = "top";
		this_cat_elm.style.marginRight = "20px";
		this_cat_elm.innerHTML = ALL_CATEGORIES[j].toString();
		target.appendChild(this_cat_elm);
	}
}

main();

// vim:foldmethod=marker
