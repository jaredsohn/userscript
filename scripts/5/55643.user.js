// ==UserScript==
// @name			Change Menu Item Defaults For Google Analytics
// @author			Erik Vergobbi Vold (erikvvold@gmail.com)
// @datecreated		2009-08-12
// @lastupdated		2009-11-14
// @namespace		changeMenuItemDefaultsForGA
// @include			https://www.google.com/analytics/reporting/*
// @version			1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript allows you to change the default reports from the overviews to other reports.
// ==/UserScript==

(function(){
	var test = document.getElementById("visitors_nav_item");
	if( !test ) return;

	var addControlPanel=function(){
		var bc=document.getElementById("Breadcrumb");
		if(!bc) return false;
		var parentNode=bc.parentNode.parentNode;

		var divI=document.createElement("div");
		parentNode.insertBefore(divI,bc.parentNode);
		var divII=document.createElement("div");
		divII.id="ControlPanel";
		divII.innerHTML='<a name="status_message_anchor"></a>';
		divI.appendChild(divII);
		var divIII=document.createElement("div");
		divIII.id="report_tools";
		divII.insertBefore(divIII,divII.firstChild);
		divIII.innerHTML=(<><![CDATA[
			<b class="controlbar_border">
				<b class="controlbar_border_layer3"></b>
				<b class="controlbar_border_layer2"></b>
				<b class="controlbar_border_layer1"></b>
			</b>
			<div id="controlbar_border_content">
				<table class="report_menu_left" cellspacing="0" cellpadding="0">
					<tbody>
						<tr>
							<td id="save_default_button_item">&nbsp;</td>
						</tr>
					</tbody>
				</table>
			</div>
			<b class="controlbar_border">
				<b class="controlbar_border_layer1"></b>
				<b class="controlbar_border_layer2"></b>
				<b class="controlbar_border_layer3"></b>
			</b>
		]]></>).toString();

		return true;
	}

	var exportBtn=document.getElementById("export_button_item");
	if(!exportBtn && !addControlPanel()) return

	var controlbar = document.getElementById('controlbar_border_content');

	function Section(inName,inGMValName,inNavID,inNavAry){
		this.name=inName;
		this.gmValName=inGMValName;
		this.navID=document.getElementById(inNavID);
		this.navAry=inNavAry;
		this.inArea=false;
		this.oldDefault=inNavAry[0];
		this.isCurrentPage=function(pg){
			var ary=this.navAry;
			for(var i=0;i<ary.length;i++){
				if(pg==ary[i]){
					this.inArea=true;
					return true;
				}
			}
			return false;
		}
		this.getDefault = function(){
			return GM_getValue(this.gmValName,this.navAry[0]);
		}
		this.isDefaultPage=function(pg){
			if(pg==this.getDefault()) return true;
			return false;
		}
		this.resetLink=function(){
			resetNavLink(this.navID,this.oldDefault,this.getDefault());
		}
		this.setDefault=function(pg){
			this.oldDefault=this.getDefault();
			GM_setValue(this.gmValName,pg);
		};
	}

	var intelAreas = [	"daily_events",
						"weekly_events",
						"monthly_events"
						];
	var visitorsAreas = [	"visitors", 
							"benchmark",
							"maps",
							"visitor_types",
							"visits",
							"unique_visitors",
							"pageviews",
							"average_pageviews",
							"time_on_site",
							"bounce_rate",
							"loyalty",
							"recency",
							"length_of_visit",
							"depth_of_visit",
							"browsers",
							"platforms",
							"os_browsers",
							"colors",
							"resolutions",
							"flash",
							"java",
							"networks",
							"hostnames",
							"speeds",
							"user_defined"
						];
	var trafficAreas = ["sources",
						"direct_sources",
						"referring_sources",
						"search_engines",
						"all_sources",
						"adwords",
						"keyword_position",
						"tv",
						"keywords",
						"campaigns",
						"ad_versions"
						];
	var contentAreas = ["content",
						"top_content",
						"content_titles",
						"content_drilldown",
						"entrances",
						"exits",
						"site_search",
						"adsense_overview",
						"events"
						];
	var goalAreas = [	"goals",
						"total_goal_conversions",
						"goal_conversion_rate",
						"goal_verification",
						"reverse_goal_path",
						"total_goal_value",
						"abandoned_funnels",
						"goal_funnel"
						];

	var sectionAry=[new Section("intel","intelSecDefaultPage","intelligence_events_nav_item",intelAreas),
					new Section("visitors","vistorSecDefaultPage","visitors_nav_item",visitorsAreas),
					new Section("traffic","trafficSecDefaultPage","traffic_sources_nav_item",trafficAreas),
					new Section("content","contentSecDefaultPage","content_nav_item",contentAreas),
					new Section("goals","goalSecDefaultPage","goals_nav_item",goalAreas)
					];

	var resetNavLink = function ( section_id, defaultPage, newPage ) {
		if( section_id == undefined ) return false;
		var ele=section_id;
		ele.href = (ele.href + "").replace("/"+defaultPage+"?", "/"+newPage+"?");
		ele.setAttribute("onclick","VisualizationModule.changeReport('"+newPage+"',null); return false;");

		return true;
	};

	var docPage = (document.location + "").match(/\/([^\?\/]*)\?/i)[1];

	var curSection=false;
	for(var i=0;i<sectionAry.length;i++){
		if (sectionAry[i].isCurrentPage(docPage)) {
			curSection=sectionAry[i];
			break;
		}
	}
	if(!curSection) return false;

	var saveDefault = function(){
		curSection.setDefault(docPage);	
		curSection.resetLink();

		removeMakeDefaultBtn();
		docPageIsDefault();

		return true;
	}

	var addMakeDefaultBtn = function(){
		var btnStr="<a href='#' class='button' id='make-default-btn'><b><b><b>Make Default</b></b><b/></a>";
		if (exportBtn) {
			var td = document.createElement("td");
			td.id = "save_default_button_item";
			td.innerHTML = btnStr;
			exportBtn.parentNode.insertBefore(td, exportBtn);
		}
		else {
			var inputArea = document.getElementById("save_default_button_item");
			inputArea.innerHTML = btnStr;
		}

		//add event handlers
		var btn = document.getElementById("make-default-btn");
		btn.addEventListener("click", saveDefault, true);
	}

	var removeMakeDefaultBtn = function(){
		var makeDefaultBtn = document.getElementById("make-default-btn");
		makeDefaultBtn.parentNode.innerHTML="&nbsp;";

		return;
	}

	var docPageIsDefault = function(){
		GM_addStyle((<><![CDATA[
			#controlbar_border_content{background-color:#FF6D06}
			.beta_label{color:#FFF}
			#segment_button_label{color:#FFF}
		]]></>).toString());

		return;
	}

	var isDefault=false;
	sectionAry.forEach(function(ele,index,ary){if(ele.isDefaultPage(docPage)) isDefault=true;},this);
	if(isDefault) docPageIsDefault();
	else addMakeDefaultBtn();

	// set saved defaults
	sectionAry.forEach(function(ele,index,ary){ele.resetLink();});
})();