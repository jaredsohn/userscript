// ==UserScript==
// @name           MyDTCC
// @namespace      Nav
// @include        *.dtcc.edu*
// ==/UserScript==

//************** Greasemonkey for Firefox **************


var debug = false;
var debug_inclusion = true;
var debug_indexes = false;
var debug_courses = false;
var debug_bc = false;
var debug_clean = false;
var debug_season = false;
var debug_button = false;
var debug_campus = false;
var debug_lookup = false;
var debug_inclusion = false;
var debug_LDA = false;
var debug_prereq = false;
var debug_prereq_display = false;
var debug_previous_courses = false;
var debug_previous_courses_terms = false;
var debug_previous_courses_terms_2 = false;
var debug_course_name = false;
var debug_prereq_list = false;
var debug_strip = false;
var debug_ohara = false;
var test_inner_frames = false;
var debug_count_students = false;
var debug_gc_headings = false;
var debug_course_search_form = false;
var debug_quick_class_search_cells = false;
var debug_quick_class_search_rows = false;
var debug_student_menu = false;
var debug_adv_search = false;

if(debug_inclusion) {
	console.log("my_dtcc.user.js");
}


if(window.location.href.match("dilbert.dtcc.edu")) {
	//------------------------------------------------------------
	//On all BannerWeb pages, remove the "info" image and text
	//------------------------------------------------------------
	my_info_div = document.getElementsByTagName("div")[7];
	if(my_info_div) {
		my_info_div.style.display = "none";
	}


	//------------------------------------------------------------
	//On all BannerWeb pages, remove the background image
	//------------------------------------------------------------
	document.getElementsByTagName("body")[0].style.backgroundImage = "";
	
	
	//------------------------------------------------------------
	//On all BannerWeb pages, if a term selection box exists, 
	//select the current term
	//------------------------------------------------------------
	my_select = document.getElementsByName("term")[0];
	
	if(!my_select) {
		my_select = document.getElementById("term_input_id");
	}
	
	if(my_select) {
		my_select.style.border = "1px gray dotted";
	
		my_term_list = my_select.options;
		
		var d = new Date();
		current_year = d.getFullYear();

		season = "";			
		other_year = "";
		current_month = d.getMonth();
		if(current_month==11) {
			//Dec
			season = "spring";
			other_year = current_year*1+1;
		}
		if(current_month<4) {
			//Jan, Feb, Mar, Apr
			season = "spring";
			other_year = current_year-1;
		}
		if(4<=current_month && current_month<=6) {
			//May, Jun, July
			season = "summer";
		}

		if(7<=current_month && current_month<=9) {
			//August, September, November
			season = "fall";
			other_year = current_year*1+1;
		}

		if(debug_season) {
			console.log(season + " " + current_year);
		}

		

		L = my_term_list.length;
	
		for(var i=0; i<L; i++) {
			t = my_term_list.item(i).text;
			t = t.toLowerCase();
			if(t.match(season)) {
				if(t.match(current_year)) {
					if(t.match(other_year)) {
						my_term_list.selectedIndex = i;
					}
				}
			}
		}
		
	}
	//------------------------------------------------------------
	//Done with selecting the current term
	//------------------------------------------------------------
	
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


if(window.location.href.match("banweb.php")) {
	if(debug_lookup) {
		console.log("banweb");
	}

	if(window.location.href.match("LUC=1")) {

		window.location = "https://dilbert.dtcc.edu/pls/dtcc/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu&LUC=1";
	}
}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************




function foo() {
	frame_document = window.frames[1].document;
	file_box = frame_document.getElementById("newFile");
	if(!file_box) { 
		frame_document = window.frames[1].document.getElementsByTagName("frame")[1].document;
		file_box = frame_document.getElementById("newFile"); 
	}
	filename=file_box.value; 
	b=filename.lastIndexOf("\\"); 
	b+=1; 
	p=filename.lastIndexOf("."); 
	s=filename.slice(b,p); 
	t=frame_document.getElementById("user_title");
	t.size=66; 
	t.value=s; 
	frame_document.forms[0].submit(); 
}

var include_transcript_in_pre_req = true;

 
if(debug_inclusion) {
	if(console) {
		console.log("greasemonkey script started");
	}
}


window.localStorage.course1 = "_412813_1"; //Fall 2011, MAT 015
window.localStorage.course2 = "";
window.localStorage.course3 = "";
window.localStorage.course4 = "";

prereq_cookie_value = readCookie("make_prereq_chart");
		
if(debug_prereq) {
	try { console.log("window.location.href==" + window.location.href); } catch(err){}
	try { console.log("prereq_cookie_value==" + prereq_cookie_value); } catch(err){}
	try { console.log("***********************"); } catch(err){}
}

switch(window.location.href) {




	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	case "https://dilbert.dtcc.edu/pls/dtcc/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu":
		//------------------------------------------------------------
		//Redirect to course lookup
		//------------------------------------------------------------

		if(debug_lookup) {
			console.log("at banweb main menu, redirecting to course search");
		}


		window.location.href = "https://dilbert.dtcc.edu/pls/dtcc/bwskfcls.p_sel_crse_search";
		//window.location.href = "https://dilbert.dtcc.edu/pls/dtcc/bwckschd.p_disp_dyn_sched";
		//window.location.href = "https://dilbert.dtcc.edu/pls/dtcc/bwskfcls.P_GetCrse";
	break;

	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	case "https://dilbert.dtcc.edu/pls/dtcc/bwskfcls.p_sel_crse_search":

		


		//------------------------------------------------------------
		//Submit the form and go to course search
		//------------------------------------------------------------
		//document.forms[1].submit();
		

		/*
		//************************************************************************************************

		new_cell = document.createElement("td");
		new_cell.width = "75%";
		my_select.parentNode.parentNode.appendChild(new_cell);

		//************************************************************************************************
		*/
			
	break;


	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************


	/*
	case "https://dilbert.dtcc.edu/pls/dtcc/dtccfg.dtccfglst":
		//************************************************************************************************
		// Reformat other pages with alternating row colors
		//************************************************************************************************

		debug_FR = true;
		
		offset = 31;
		
		if(window.location.href=="https://dilbert.dtcc.edu/pls/dtcc/bwlkffgd.P_FacCommitFinGrd") {
			//Final Grades; form was just submitted.
			columns = 11;
			header_ending = 23;
			final_grades_submitted = true;
			offset = 34;
		}
		
		t = document.getElementsByTagName("table");

		t.item(4).style.display = "none";
		t.item(6).style.display = "none";

		brs = document.getElementsByTagName("br");




		brs.item(6).style.display = "none";
		brs.item(8).style.display = "none";
		brs.item(9).style.display = "none";


		d = document.getElementsByTagName("td");

		for(var i=23; i<26; i++) {
			d.item(i).style.display = "none";
		}

		for(var i=offset; i<d.length; i++) {
			row = (i-offset)/11;
			q = row&1;

			if(q==0) {
				if(d.item(i).style) {
					d.item(i).style.backgroundColor = "#B3DCFF"; 
				}
			}

			col = (i-offset)%11;
			if(col==2 || col==3 || col==4) {
				d.item(i).style.display = "none";
			}
			if(debug_FR) {
				d.item(i).innerHTML += "<br>" + i;
			}
		}

		//console.log(document.body.style.backgruondImage);
			
			
	break;
	*/
	
	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************


	case "https://dilbert.dtcc.edu/pls/dtcc/bwckgens.p_proc_term_date":
	case "https://dilbert.dtcc.edu/pls/dtcc/bwckcoms.P_Regs":
		//------------------------------------------------------------
		//Basic Course Search; re-direct to Advanced Course Search
		//------------------------------------------------------------
		adv_search_button = null;
		my_inputs = document.getElementsByTagName("input");
		for(i in my_inputs) {
			if(my_inputs[i]) {
				if(my_inputs[i].value) {
				
					if(debug_adv_search) {
						console.log("i==" + i);
						console.log("my_inputs[i].value==" + my_inputs[i].value);
					}
				
					if(my_inputs[i].value == "Advanced Search") {
						adv_search_button = my_inputs[i];
					}
				}
			}
		}
		
		if(debug_adv_search) {
			console.log("adv_search_button==" + adv_search_button);
			console.log("adv_search_button.value==" + adv_search_button.value);
			adv_search_button.style.border = "1px red solid";
			adv_search_button.style.id = "ffffffffffffff";
		}
		adv_search_button.click();
	
	break;
	
	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	case "https://dilbert.dtcc.edu/pls/dtcc/bwskfcls.P_GetCrse":
		//------------------------------------------------------------
		//Adjusting the course search form
		//------------------------------------------------------------
		
		c = new Array();
		c[0] = "Laser and Optics";
		c[1] = "Physics";
		c[2] = "Mathematics";
		c[3] = "Electronic/Electrical Engring";
		

		subj_select = document.getElementById("subj_id")
		subj_select.size = 10;
		subj_options = subj_select.options;

		if(debug_course_search_form) {
			console.log("c.length==" + c.length);
		}
		
		for(var i=0; i<c.length; i++) {

			index = -1;

			for(var j=0; j<subj_options.length; j++) {
				if(subj_options[j].text == c[i]) {
					index = j;
				}
			}

			//index = c[i];

			if(index!=-1) {
				my_option = subj_select.options[index];
		
				if(debug_course_search_form) {
					console.log("my_option==" + my_option);
				}
				subj_select.remove(index);
				try {
					subj_select.add(my_option,subj_select.options[0]);
				}
				catch(error) {
					//IE
					subj_select.add(my_option,0);
				}
			}
		}
		
	break;


	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************


	case "https://my.dtcc.edu/webapps/portal/frameset.jsp?tab_id=_12_1":
	case "https://my.dtcc.edu/webapps/portal/frameset.jsp":
		//------------------------------------------------------------
		//Increasing bread crumb font size
		//------------------------------------------------------------
		//window.setInterval(increase_bc,1000);

		//------------------------------------------------------------
		//After posting something on blackboard, automatically redirect
		//------------------------------------------------------------
		window.setInterval(blackboard_redirect,100);
		
		
		//------------------------------------------------------------
		// Remove headings from Grade Center
		//------------------------------------------------------------
		gc_timer = 100;
		if(debug_gc_headings) {
			gc_timer = 1000;
		}
		window.setInterval(remove_gc_headings,gc_timer);
		
		
		//------------------------------------------------------------
		// Count students in a course
		//------------------------------------------------------------
		window.setInterval(count_students,1000);

	break;

	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	case "https://dilbert.dtcc.edu/pls/dtcc/bwlkostm.P_AdvSelTerm":
		//window.setInterval(get_term,100);
		get_term();
	break;

	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************




	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	case "https://my.dtcc.edu/webapps/portal/frameset.jsp?LUC=1":

		if(debug_lookup) {
			console.log("at mydtcc main page, redirecting to banweb");
		}

		//window.location = "https://dilbert.dtcc.edu/pls/dtcc/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu#LUC";
		window.location = "https://manage.dtcc.edu/php/cas/banweb.php";

	break;

	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************



	case "https://dilbert.dtcc.edu/pls/dtcc/bwlkfmgd.P_FacMidGrdPost":
	case "https://dilbert.dtcc.edu/pls/dtcc/bwlkfmgd.P_FacMidGrd":
	case "https://dilbert.dtcc.edu/pls/dtcc/dtcclda.dtccldalst":
	case "https://dilbert.dtcc.edu/pls/dtcc/dtccmtp.dtccmtplst":
	case "https://dilbert.dtcc.edu/pls/dtcc/bwlkffgd.P_FacCommitFinGrd":
	case "https://dilbert.dtcc.edu/pls/dtcc/bwlkffgd.P_FacFinGrd":
	case "https://dilbert.dtcc.edu/pls/dtcc/dtccfg.dtccfglst":
	case "https://dilbert.dtcc.edu/pls/dtcc/dtccns.dtccnslst":
		//-------------------------------------------------------------------------------
		// Re-formatting the No-show, LDA, Interim roster, and Final Grade submission
		//-------------------------------------------------------------------------------

		debug_FR = true;
		
		my_term_select = document.getElementsByName("term")[0];
	
		if(!my_term_select) {
			my_term_select = document.getElementById("term_input_id");
		}
		
		if(!my_term_select) {
			//GM_addStyle("leftaligntext { margin:0px !important; }");
		
		
			rows = document.getElementsByTagName("tr");
			submitted = false;

			header_ending = 20;
			
			final_grades_submitted = false;
			
			columns_to_hide = [2,3,4,9,10];
			
			for(var i in rows) {
				if(i>11) {
					try {
					
						if(rows[i]) {
						
							q = i&1;

							if(q==0) {
								if(rows[i].style) {
									rows[i].style.backgroundColor = "#B3DCFF"; 
								}
							}
							
							my_paragraphs = rows[i].getElementsByTagName("p");
							for(a in my_paragraphs) {
								if(my_paragraphs[a]) {
									if(my_paragraphs[a].style) {
										my_paragraphs[a].style.margin = "0";
									}
								}
							}
						
						
							my_child_nodes = rows[i].getElementsByTagName("td");
							//my_child_nodes = rows[i].childNodes;
						
						
							if(my_child_nodes) {
								for(var j in columns_to_hide) {
							
									column = columns_to_hide[j];
							
									if(my_child_nodes[column]) {
										if(my_child_nodes[column].style) {
											
											my_child_nodes[column].style.display = "none";
											
											if(debug_LDA) {
												my_child_nodes[column].style.display = "";
												my_child_nodes[column].style.border = "red solid";
												my_child_nodes[column].innerHTML += "<BR>i==" + i;
												my_child_nodes[column].innerHTML += "<BR>column==" + columns_to_hide[j];
											}

										}
									}
									else {
										if(debug_LDA) {
											console.log("my_child_nodes[column] is null");
											console.log("i==" + i);
											console.log("column==" + columns_to_hide[j]);
										}
									}
								}
								//end of "for" loop
							}
						}
					}
					//end of "try"
					catch(error) {
						if(debug_LDA) {
							console.log(error);
						}
					}
				}
				//end of "if i>11"
			}
			//end of "for" loop
			
			
		}
		//end of "if"; checking for existence of term selection
		
		
		
		
		

		
		

	break;

	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************


	
	case "https://dilbert.dtcc.edu/pls/dtcc/dtccfg.dtccfgpost":
		//************************************************************************************************
		// Page that asks for an electronic signature. Just submit the form.
		//************************************************************************************************
		document.forms[1].submit();
	break;
	
	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	
	case "https://dilbert.dtcc.edu/pls/dtcc/bwckschd.p_get_crse_unsec":
		//************************************************************************************************
		// Search results for the "Quick Class Search"
		//************************************************************************************************
		
		course=0;
		
		my_headers = document.getElementsByTagName("th");
		
		for(i in my_headers) {
			if(my_headers[i]) {
				if(my_headers[i].className) {
					if(my_headers[i].className=="ddtitle") {
						my_headers[i].style.borderTop = "1px black solid";
						my_headers[i].style.padding = "0";
						
						course++;
						q = course&1;

						if(q==0) {
							my_headers[i].style.backgroundColor = "#B3DCFF"; 
						}
						else {
							my_headers[i].style.backgroundColor = "#FFFFFF"; 
						}
					}
					
					if(my_headers[i].className=="ddheader") {
						q = course&1;

						if(q==0) {
							my_headers[i].style.backgroundColor = "#B3DCFF"; 
						}
						else {
							my_headers[i].style.backgroundColor = "#FFFFFF"; 
						}
					}
				}
			}
		}
			
		
		
		course=0;
		my_cells = document.getElementsByTagName("td");
		
		for(i in my_cells) {
			if(my_cells[i]) {
				cell_string = my_cells[i].innerHTML;
				
				if(cell_string) {
					if(debug_quick_class_search_cells) {
						console.log("i==" + i);
						console.log("cell_string==" + cell_string);
					}
					
					cell_string = cell_string.replace(/<br>[^<]*<span[^>]*>Registration Dates: <\/span>[^<]*<br>/i, "");
					cell_string = cell_string.replace(/<span[^>]*>Levels: <\/span>[^<]*<br>/i, "");
					cell_string = cell_string.replace(/[^>]*Schedule Type[^<]*<br>/i, "");
					cell_string = cell_string.replace(/<br>[^<]*<a[^>]*>View Catalog Entry<\/a>[^<]*<br>[^<]*<br>/i, "");
					cell_string = cell_string.replace(/<caption[^>]*>Scheduled Meeting Times<\/caption>/i, "");
					cell_string = cell_string.replace(/<\/table>\s*<br>\s*<br>/i, "</table>");
					my_cells[i].innerHTML = cell_string;
					
					if(cell_string.indexOf("Associated Term") != -1) {
						my_cells[i].style.padding = "0"; 
						course++;
						q = course&1;

						if(q==0) {
							my_cells[i].style.backgroundColor = "#B3DCFF"; 
						}
						else {
							my_cells[i].style.backgroundColor = "#FFFFFF"; 
						}
					}
				}
			}
		}
		
		
		my_rows = document.getElementsByTagName("tr");
		
		if(debug_quick_class_search_rows) {
			console.log("my_rows==" + my_rows);
		}
		
		for(i in my_rows) {
			if(my_rows[i]) {
				
				if(my_rows[i].getElementsByTagName) {
					cells_in_current_row = my_rows[i].getElementsByTagName("td");
					
					if(debug_quick_class_search_rows) {
						console.log("i==" + i);
						console.log("cells_in_current_row[6]==" + cells_in_current_row[6]);
					}

					
					if(cells_in_current_row[6]) {
						//Instructor
						clean(cells_in_current_row[6]);
					}
				}
			}
		}
		
		GM_addStyle(<str><![CDATA[
			 table.datadisplaytable {
				border-width: 1px !important;
				border-color: black !important;
				border-style: solid !important;
				border-collapse: collapse !important;
			}
			table.datadisplaytable th.ddheader {
				border-width: 1px !important;
				border-color: black !important;
				border-style: solid !important;
			}
			table.datadisplaytable td {
				border-width: 1px !important;
				border-color: black !important;
				border-style: solid !important;
			}
]]></str>.toString());
	
		
		
	break;
	
	//************************************************************************************************
	//************************************************************************************************
	//************************************************************************************************

	
	case "https://dilbert.dtcc.edu/pls/dtcc/twbkwbis.P_GenMenu?name=bmenu.P_FacStuMnu":
	
		if(debug_student_menu) {
			console.log("foo");
		}
	
	
		faculty_image = document.createElement("img");
		faculty_image.src = "/facgifs/hwsghdfs.gif";
	
		my_images = document.getElementsByTagName("img");
		for(i in my_images) {
			try {
				if(my_images[i].src=="/facgifs/hwsghdsi.gif") {
					my_images[i].parentNode.appendChild(faculty_image);
					break;
				}
			}
			catch(error) {
				console.log(error);
			}
		}
	
	break;
	
	default:

	break;

}
// end of switch-case








//************************************************************************************************
//************************************************************************************************
//************************************************************************************************






if(window.location.href.match("login.dtcc.edu/cas/login")) {


//	if(debug_lookup) {
//		console.log("login")
	//}

	//------------------------------------------------------------
	//Automatically login
	//------------------------------------------------------------
	a=document;a.getElementById("username").value="njagatp1";
	a.getElementById("password").value="IfKot4oJ";
	b=a.getElementsByName("submit")[0];
	b.click();
}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************



if(window.location.href.match("https://dilbert.dtcc.edu/pls/dtcc/bwlkosad.P_FacSelectAtypView")) {
	//************************************************************************************************
	//Student info.
	//************************************************************************************************
	prereq_cookie_value = readCookie("make_prereq_chart");
	
	if(prereq_cookie_value=="true") {
		// Re-direct to student's test scores
		window.location.href = "https://dilbert.dtcc.edu/pls/dtcc/dtccwebtest.dtccTestScores";
	}
	else {
		// Re-direct to student transcript.
		window.location.href = "https://dilbert.dtcc.edu/pls/dtcc/bwlkftrn.P_FacDispTran";
	}

}



if(window.location.href.match("https://my.dtcc.edu/webapps/blackboard/content/manageItem.jsp?")) {

	document.getElementById("the_form").style.border = "1px red solid";
}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


function addCss(cssCode) {
	debug_css = true;

	if(debug_css) {
		console.log("addCss() -- cssCode==" + cssCode);
	}

	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssCode;
	} 
	else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);

	if(debug_css) {
		console.log("addCss() -- done");
	}
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************



function increase_bc() {
	//increase the size of the bread crumbs
	for(var i=1; i<4; i++) {
		try {
			tables = window.frames[i].document.getElementsByTagName("table");
			bc_table = tables[0];
			bc_table.style.fontSize = "32px";
		}
		catch(err) {}
	}
	
	//try {
		tables = window.frames[1].document.getElementsByTagName("frame")[1].document.getElementsByTagName("table");
		bc_table = tables[0];
		bc_table.style.fontSize = "32px";
	//}
	//catch(err) {}
}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


function remove_gc_headings() {
	//remove the headings from the grade center
	try {
		hide_frame1_tag("span",0);
		hide_frame1_tag("h1",0);
		hide_frame1_tag("div",2);
		hide_frame1_tag("table",2);
		hide_frame1_tag("div",3); 
		hide_frame1_tag("div",4); 
		hide_frame1_tag("div",5); 
		hide_frame1_tag("div",6);
		hide_frame1_id("pageTitleDiv");
		hide_frame1_id("breadcrumbs");
		window.frames[1].document.getElementsByTagName("body")[0].style.padding="0";
		
		location_pane = window.frames[1].document.getElementsByTagName("div")[7];
		if(debug_gc_headings) {
			console.log("location_pane==" + location_pane);
		}
		location_pane.style.margin="0";
		
		window.frames[1].document.getElementById("containerdiv").style.padding="0";
	}
	catch(err) {}
			
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************

function hide_frame1_tag(str,n){
	window.frames[1].document.getElementsByTagName(str)[n].style.display="none";
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


function hide_frame1_id(str){
	window.frames[1].document.getElementById(str).style.display="none";
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************



function blackboard_redirect() {


	//After posting something on blackboard, automatically redirect
	try {
		my_bc_span = window.frames[1].document.getElementsByTagName("span")[0];
		my_bc_text = my_bc_span.innerHTML;
		if(my_bc_text.indexOf("SUCCESS") != -1) {

			my_OK_images = window.frames[1].document.getElementsByName("img_ok");
			my_OK_image = my_OK_images[0];
			my_OK_link = my_OK_image.parentNode;
			my_OK_link.click();
		}
	}
	catch(err) {}

}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


function get_term() {
	terms = document.getElementsByName("term")[0];
	console.log("terms==" + terms);
	s = terms.selectedIndex;
	console.log("s==" + s);
	my_term = terms.options[s];
	console.log(my_term);
	console.log(my_term.text);
	window.name = my_term.text;
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


function set_window_data(parameter,value) {
	if (window.name.length>0) {
		c_start=window.name.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=window.name.indexOf(";",c_start);
			if (c_end==-1) c_end=window.name.length;
			return unescape(window.name.substring(c_start,c_end));
		}
	}
	return "";
}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


function set_window_data(parameter,value) {
	if (window.name.length>0) {
		c_start=window.name.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=window.name.indexOf(";",c_start);
			if (c_end==-1) c_end=window.name.length;
			return unescape(window.name.substring(c_start,c_end));
		}
	}
	return "";
}




//************************************************************************************************
//************************************************************************************************
//************************************************************************************************


//************************************************************************************************
// Cookie functions, From http://www.quirksmode.org/js/cookies.html
//************************************************************************************************
/*
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
*/
//************************************************************************************************
// End of functions from http://www.quirksmode.org/js/cookies.html
//************************************************************************************************





//************************************************************************************************
// Cookie-like functions based on localStorage
//************************************************************************************************
function createCookie(name,value,days) {
	window.localStorage.setItem(name,value);
}

function readCookie(name) {
	return window.localStorage.getItem(name);
}

function eraseCookie(name) {
	window.localStorage.setItem(name,null);
}
//************************************************************************************************
// End of Cookie-like functions based on localStorage
//************************************************************************************************





//************************************************************************************************
//************************************************************************************************
//************************************************************************************************




function addStyleTag(styleString) {
	var head = document.getElementsByTagName('head')[0];
	style = document.createElement('style');
	rules = document.createTextNode(styleString);
	
	style.type = 'text/css';
	if(style.styleSheet)
		style.styleSheet.cssText = rules.nodeValue;
	else style.appendChild(rules);
	head.appendChild(style);
}


//************************************************************************************************
//************************************************************************************************
//************************************************************************************************



function count_students() {
	if(debug_count_students) {
		console.log("count_students");
	}

	var tables = null;
	var user_table = null;

	//for(var i=1; i<4; i++) {
		try {
			tables = window.frames[1].document.getElementsByTagName("frame")[1].document.getElementsByTagName("table");
			user_table = tables[1];
		}
		catch(err) {}
	//}
	
	if(debug_count_students) {
		console.log("tables==" + tables);
		console.log("user_table==" + user_table);
	}
	
	
	if(user_table) {
		user_table.style.border = "1px red solid";
	}
	
	
}

//************************************************************************************************
//************************************************************************************************
//************************************************************************************************
