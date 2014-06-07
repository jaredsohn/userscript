// ==UserScript==
// @name           dev_group_list
// @description    All groups listed and search groups RegExp in one panel.\nMake group-collections to display similar topic-groups
// @namespace      dev_group_list
// @include        http://*.deviantart.com/*
// @exclude        http://adcast.deviantart.com/*
// @exclude        http://adsrv.deviantart.com/*
// @version        1.66
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @contributor    Dediggefedde
// ==/UserScript==

// All-function helps not conflicting with other scripts using some browsers. 
// Mainly Opera, but Opera has some problems with this script somehow...
(function(){

// Load jquery and an animated picture for waiting-time of group-update-button
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var wartbild="data:image/gif;base64,R0lGODlhFAAUAMwAAAAAAAAAAE9PT%2F%2F%2F%2F2lpadqkApmZmaJ6An9%2Ff%2F7klScnJ5OTk%2F3LNVxcXG1tbXR0dDQ0NKenp7meTdPT04iIiLS0tMzMzExMTKaZck5EJmRXLn9ySoBlFJR5KAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJGQAAACwFAAEACgASAEAFTSAAEEEZEGIaHEaQjkIso0BQMPdRuPAwFAMBiiAwmYSiFUPHExF9yJ5viiQUgL7C8CCTaWHXQiIKLpCThkEz%2BfM1A9mpi2io26MkEy0EACH5BAkKAAAALAUAAQAKABIAQAVNIAAQQRkQYhocRpCOQiyjQFAw91G48OAPAhRBYDIFRSuGjica%2Bo69QqJwAAp%2Fv6tMVhAKCuAEFAYeIw0DJtJXZQZ8hZ9raKjboSQTLQQAIfkECRkAAAAsBQABAAoAEgBABVEgABBBGRBiGhxGkI5CLKNAwBTDcDAurOcCFEFgMgVFgQTjUOiJhkDasJCgFg5HQm47EGJlsS6MyUgcnwLqWWUYOJEDnFsVv%2BJcQ4N%2BfyaZaCEAIfkECRkAAAAsBQABAAoAEgBABUsgABBBGRBiGhxGkI5CLKNAwAw47sLFkRQCFEFgMgVFgQTjUNiJhoPDkff7SYW5HFYmGwgFh9yUOkYaBk5k1rkq9ApomGFOn5JMtBAAIfkECRkAAAAsBQABAAoAEgBABU0gABBBGRBiGhxGkI5CLKNAMNy4CydHUQgogsBkAooChUFPJxLejLBCQlo4GAk4XHAgkw2Cgiw0mhgfDQPmceA7MJFtn0toqNuhJBMtBAAh%2BQQJGQAAACwDAAEADwASAEAFdiAgjmJVGWQaZIclBEiKBErwNGkuNtEQvTBCQ1AoHgqcgC7VmCEGTp1jQKUuKoABgACbDBbKFEXwMEgShQ1kyZxGdYGFoPY0YFWL6lxAySkwVi8yAQISAxcOKQQOCBNoBR04igEGFgVHAhpwCmRmmWwIEA0ESyEAIfkECRkAAAAsAgAFABAACgBABUEgQBBAaZ4jEAhCQJ5iMLRrURzFYAx8Twu81ouwCgZqtsOvNzuyXLBYc5UoJKZAnzOBwxV2zB9OWCJmW6JXtEwKAQAh%2BQQJGQAAACwCAAEADwASAEAFdyAgAoazjCiKBIJ1ZEgqA88TKEEMEKsiRIWIY5YKGAZIpKIBWCEKCEXkJKMsCljskDgKLAaTKIEIOQ4MhoeAInIWHEyZQQG9CRaBqsCXxZPvWBgKXCQOFwMSARA6Mw0TEkhhDmMpAgJJFgYBlCiWaGo4XAQNiyMhADs%3D";

var grouplistalt =new Array(); // Groups it is already in. Will get refreshed every time you open the group-popup (start())
var grouplist =new Array(); // List of all your groups (member). icon-path+chr(1)+name+chr(1)+title Update with updatebutton() -> getgroups from /mygroups/ 
var collist =new Array(); // List of all group-collections. uses same index as collistgroups. load at pagerefresh, save at add/remove item
var collistgroups =new Array(); //List of groups within a collection. pattern group+chr(1)+group. Same index as collist, same behavior
var temp="";
var user="";
function listverzlad(){
	if($("td#oh-menu-deviant span.username").length==0){setTimeout(listverzlad,500);return;}
	user=$("td#oh-menu-deviant span.username-with-symbol span.username").html();
	console.log(user);
	// user="alexgphoto";
	//Compatibility for old script after multi-user-usage
	if(typeof GM_getValue("grouplist") != "undefined"){
		GM_setValue(user+"_grouplist",GM_getValue("grouplist"));
		GM_deleteValue("grouplist");
	}
	if(typeof GM_getValue("collist") != "undefined"){
		GM_setValue(user+"_collist",GM_getValue("collist"));
		GM_deleteValue("collist");
	}
	
	if(GM_getValue(user+"_grouplist")){
		grouplist=GM_getValue(user+"_grouplist").split(String.fromCharCode(21));
	} //load grouplist, update only manual or when grouplist empty. delimeter: chr(21)
	if(GM_getValue(user+"_collist")){ //Load collist&collistgroup. pattern collection+chr(1)+group+chr(1)+group+chr(2)+collection
		temp=GM_getValue(user+"_collist").split(String.fromCharCode(2));var spl;
		for(var i in temp){
			spl=temp[i].split(String.fromCharCode(1));
			collist.push(spl.shift());
			collistgroups.push(spl.join(String.fromCharCode(1)));
		}
	}
	
}

listverzlad();
GM_addStyle(".search_switch,.first_option{ display:none!important;}"+
	".submit_to_groups .container { overflow: visible!important;}"+
	"#dev_gle_update {position:absolute;left:-200px;cursor:pointer;text-decoration:none; bottom: 0px;}"+
	"#dev_group_but1,#dev_group_but2 {width:70px;cursor:pointer;}"+
	"#group_list_search{font-size: 9pt;font-weight: bold;}"+
	"#group_list_search input{margin-left: 10px;margin-bottom: 10px;width: 80%;}"+
	".second_option .number{display:none}"+
	".submit_to_groups .favourite_groups{height:250px!important; margin-bottom: 20px;}"+
	"div.item{width: 99%!important;}"+
	'#dev_group_col_text{margin-bottom: 10px;height: 14px;position: relative;width: 175px;z-index: 1;border: 0 solid;}'+
	'#dev_group_col_add{height: 20px;margin-left: -176px;position: relative;width: 199px;}'+
	'#dev_group_col_title{font-size: 12pt;font-weight: bold;text-align: center;}'+
	'#dev_group_but1{float:left;}'+
	'#gallery_selection{margin:0px!important;}'+
	'#dev_group_but2{float:right;}'+
	'#group_stat2{margin-left: 50px;}'+
	'div.submit_to_groups div.container div.submit_button a.submit{margin:0px!important; }'+
	'#dev_group_col{background-color: #D4DFD0;border: 1px solid #AAB5AB;border-radius: 5px 5px 5px 5px;line-height: 30px;margin-left: -8px;margin-top: 20px;padding:  5px 10px 35px 5px;text-align: left;width: 100%;}');

// Get groups you are member of from /mygroups/. used by updatebutton $(a"#dev_gle_update").click()
// recursive function for more groups than 100
function getgroups(offset, by) {
	//updatebutton changes text and gets wating-icon
	$.get('http://'+by+'.deviantart.com/modals/mygroups/?offset='+offset,function(data){
		// get all grounames(2) as they are text between a-tags, image-paths (1) for their icon and titles(3) between span-tags
		var rex = /<img class="avatar" src="([\s\S]*?)"[\s\S]*?\/><\/a>[\s\S]*?<a class=".*?username.*?"[\s\S]*?>([\s\S]*?)<\/a>[\s\S]*?<span class="realname">([\s\S]*?)<\/span>/gi;
		var iter="";
		while(iter = rex.exec(data)){
			grouplist.push(iter[1]+String.fromCharCode(1)+iter[2]+String.fromCharCode(1)+iter[3]);
		}
		if(grouplist.length==0){
			console.log("There is an error fetching groups!\n"+'http://'+by+'.deviantart.com/modals/mygroups/?offset='+offset+"\n"+data);
		}
		$("#dev_group_list_loadingbutton").attr("title",(offset+100)+"groups scanned!");
		// check if browsing needed (>100 groups) when having a not-disabled  Next-Button
		if(data.search(new RegExp('<a class="disabled">Next</a>',"i"))==-1){
			setTimeout(function(){//stupid opera
				GM_setValue(user+"_grouplist",grouplist.join(String.fromCharCode(21)));	// Back up current state
				getgroups(offset+100,by); //100 groups per page, recursive call
			},0);
		}else{
			grouplist=grouplist.sort().reverse(); // inserting them is upside-down
			setTimeout(function(){//stupid opera
				GM_setValue(user+"_grouplist",grouplist.join(String.fromCharCode(21)));	// Back up current state
				$("#dev_gle_update").html("Update List of Groups<b></b>"); //updatebutton back to normal
				start(); //show current list of groups/highlight them etc (basicly restart script)
			},0);
			
		}
    });
}

//Get groups the deviation is already in from difi using "getAllGroups"
//used every time the group-dialog is opened
function getaltgroups(){
	if(grouplistalt.length>0){markaltgroups();return true;} //unnecessary calls won't contact difi again. to contact, clear grouplistalt first!
	var devid=$("div.dev-title-container h1 a").first().attr("href").match(/\d+$/i); //deviation-id
	var duser=$("div.dev-title-container h1 a.u").html().toLowerCase(); //author's name toLower
	$.ajax({
			mimeType: "text/html; charset=ISO-8859-1", //sometimes some strange behavior without charset...
			url: "http://"+duser+".deviantart.com/global/difi/?c[]=%22DeviationView%22,%22getAllGroups%22,["+devid+"]&t=xml"
		}).done(function(data){
			// Only group-links on this page, so target-account->groupaltlist
			var rex=/href=&quot;http:\/\/.*?\.deviantart\.com\/&quot;[^>]*?>(.*?)&lt;\/a>/gi;
			var iter="";
			while (iter=rex.exec(data))  
			{  
			  grouplistalt.push(iter[1]);
			}  
			markaltgroups();//gray out groups where it's already in
		});
}

//group's css is changed and xml-attribute "deakt" added. eventhandler doesn't load difi when deakt set
function markaltgroups(){
	grouplistalt.push("TheSp0t");
	for(var i in grouplistalt){	
		var so=$("#"+grouplistalt[i]);
		so.css("background-color","#b2bbae");
		so.find("span").css("color","#ddd");
		so.attr("deakt","true");
	}
}

//sets css-atribute "display" of groups to none or remove it depending on filter-method.
//leading * will search collgroups for match
//leading # will deactivate this function. handler for this is defined in inserted code
function filter(){
	if($("#group_list_search input").length==0)return true; //too early calls will stop function
	if($("#group_list_search input").val().indexOf("#")==0){$("div.item").css("display","");return true;} //leading # will stop function and show everything
	if($("#group_list_search input").val().indexOf("*")==0){ //leading * searches for collections
		var zielopt=$("#dev_group_col_add option").filter(function(){ 
			//search case-insenstive for groups containing pattern. [change >-1 to ==0 for leading instead of containing] 
			return ($(this).html().toLowerCase().indexOf($("#group_list_search input").val().substr(1).toLowerCase()) > -1);
		});
		if(zielopt.length==0)return true; //abort when no existing collection is found
		$("#dev_group_col_add").val(zielopt.html()); //select the collection in the dropdown-list for colshow
		colshow(); //shows the groups of the currently selected collection
		return true;
	}
	
	//For normal text without leading * or #:
	
	//try to create Regexp. if it fails, the Regexp is not valid, text-field is marked red and function aborted 
	var rex;
	try {rex=new RegExp($("#group_list_search input").val(),"i")}catch(e){$("#group_list_search input").css("background-color","red");return true;}
	$("#group_list_search input").css("background-color",""); //normal searchfield for valid Regexp
	var curshowlist=$("div.item");
	curshowlist.css("display","");//everything shown
	curshowlist.each(function(){
		var groupnam=$(this).attr("id")//get name of group
		if(groupnam.search(rex)==-1)$("#"+groupnam).css("display","none");//if group doesn't match string, make the group-item disappear
	})
	// for(var i in grouplist){ 
		// var groupnam=grouplist[i].split(String.fromCharCode(1))[1]//get name of group
		// if(groupnam.search(rex)==-1)$("#"+groupnam).css("display","none");//if group doesn't match string, make the group-item disappear
	// }
}

// save collections into GM "collist"
function colsave(){
	var tmp="";
	for(var i in collist){
		tmp+=String.fromCharCode(2)+collist[i]+String.fromCharCode(1)+collistgroups[i];
	}
	
	//crazy workaround for not being able to call GM_setValue from an unknwon window directly: wait 0s to call an anonymous function with it.
	setTimeout(function(){GM_setValue(user+"_collist",tmp.substr(1));},0);
}

// load collections from collist into dropdownfield
function colload(){
	$("#dev_group_col_add").empty();
	for(var i in collist){
		$("#dev_group_col_add").append("<option>"+collist[i]+"</option>");
	}
}

//Add new collections to collist, collistgroups, the dropdown and saving
function coladd(){

	//Only collections with groups should get saved, so this only works with a group selected and a name for the collection inserted
	var colnam=$("#dev_group_col_text").val();
	var groupnam=$("div.item.selected").first().attr("id");
	if(colnam==""||groupnam==""||typeof groupnam=="undefined"||typeof colnam=="undefined")return true;
	
	if(collist.indexOf(colnam)==-1){ //create new collection 
		//Standard-prompt (Yes, Cancel) should be enough for this:
		if(!confirm("You are about to create a new group-collection!\n Do you want to continue?"))return true;
		collist.push(colnam);//Adding items to arrays
		collistgroups.push(groupnam);
		$("#dev_group_col_add").append("<option>"+colnam+"</option>");
	}else{ //add group to existing collection
		if(collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1)).indexOf(groupnam)==-1){
			//new group for collection: add the group-name and delimiter to the end of the collection-item's groupname's array
			collistgroups[collist.indexOf(colnam)]+=String.fromCharCode(1)+groupnam;
		}else{ //group is already added
			//again simple prompt should be enough here...
			alert("Group already in group-collection!");
			return true;
		}
	}	
	colsave(); //save to GM
}

//Remove group from list. Empty groups will get deleted
function colrem(){

	//Only collections with groups should get saved, so this only works with a group selected and a name for the collection choosen in dropdown
	var colnam=$("#dev_group_col_add").val();
	var groupnam=$("div.item.selected").first().attr("id");
	if(colnam==""||groupnam==""||typeof groupnam=="undefined"||typeof colnam=="undefined")return true;
		
	//check if group really in collection
	if(collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1)).indexOf(groupnam)==-1){
		//again simple prompt should be enough here...
		alert("Group not in collection!");		
	}else{ //remove group:
		//get index of group in collection's groupname's list and remove this entry from array
		var tmp=collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1));
		tmp.splice(tmp.indexOf(groupnam),1);
		collistgroups[collist.indexOf(colnam)]=tmp.join(String.fromCharCode(1));
		
		if(collistgroups[collist.indexOf(colnam)]==""){ //empty collections should get removed
			collistgroups.splice(collist.indexOf(colnam),1); //remove collection's groupnamelist
			$("#dev_group_col_add option").filter(function(){return $(this).html()==colnam;}).remove(); //remove option from dropdown
			collist.splice(collist.indexOf(colnam),1); //remove collection from array
			$("#group_list_search input,#dev_group_col_text").val("");filter(); //clear textboxes and show all groups again
			if(collist.length>0){$("#dev_group_col_text").val(collist[0]);} //if there is another collection, select it instead, but don't show groups yet
		}else{ //collection still has groups
			colshow(); //show the groups
		}
		colsave(); //save to GM
	}	
}

//shows the groups of currently selected collection, used by filter()
function colshow(){
	var colnam=$("#dev_group_col_add").val();//selected collection-name of dropdown
	$("#dev_group_col_text").val(colnam); //textfield get's dropdowns value as text
	if(colnam==""||typeof colnam=="undefined")return true; //nothing selected, e.g. when nothing is in
	$("div.item").css("display","none");//hide all groups at first
	var aktgroups=collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1)); //get an array of groups of the currently selected collection
	for(var i in aktgroups){
		if($("#"+aktgroups[i]).length==0){ //you are not a member of a group you have added to collection!
			 // findOpenFolders(2) will add an entry for "groupname" at the top of group's list  
			codeinsert("groupname='"+aktgroups[i]+"';findOpenFolders(2);");
		}else{//you are member of the group
			$("#"+aktgroups[i]).css("display",""); //show group
		}
	}
}

// Some scripts must be inserted as Difi needs some authorization-informations for group-submit-permissions
function codeinsert(cont){
	var script = $('<script></script>');
	script.attr("type", "application/javascript");
	script.html(cont);
	$('body').append(script);
	// document.body.removeChild(script);//shall the site-sourcecode be tidy^^
	script.remove();//shall the site-sourcecode be tidy^^
}

//Dialog is opened, so custom code need to be inserted and script initialized. Recursive call for loading-time
function start(){

	if($(".submit_to_groups").length>0){//&&$("div.item").length>0){ //Loading successful => submit_to_groups-div is appearing
	//vast amount of code to copy/alter some built-in functions to use Difi's GrusersSubmitToGroupsModule.check_permissions//I changed not much to make it still work no wrapper-function so I can use the functions from other codeinserts as well
	
	var templ=" <div class='item' id='{id}'><table><tbody><tr><td width='100' align='right' class='group_icon'><img ></td> <td valign='top' class='group_info'>#<span class='fakelink'>{id}</span><br><span class='group_tagline'>{tagline}</span></td></tr></tbody></table></div> ";
	codeinsert("var $submit_to_groups = $('div.submit_to_groups');"+ 
				"var is_gallery = true;"+
				"var groupname = null;"+ //this group well get informations
				"var deviationid = $submit_to_groups.find('input[name=\"deviationid\"]').val();"+ //this deviation
				"var lastsearchvalue = '';"+
				"var findOpenFolders = function(wert) {"+ //when you click a group-entry, this will search for/show permissions and submitting-panel
					"$('div.submit_to_groups_navigation.bottom-bit a.submit').addClass('disabledbutton');"+
				   "$submit_to_groups.find('div.submit_button, div.option_2_box, div.error_message, div.selected_group_info, div.success_message').hide();"+
					"DiFi.pushPost('GrusersSubmitToGroupsModule', 'check_permissions', [groupname, deviationid, is_gallery], function(success, data) {"+
						"$submit_to_groups.find('img.groupname-check-img').hide();"+
						"if(success) {"+
							"if (data.response.content.groupname == groupname) {"+ 
								"if(wert>0){"+ //insert the group's entry in the grouplist when wert>0 (in use: 1 and 2)
									"if($('div'+data.response.content.groupname).length==0){"+
										// "s=$('div.item').first().clone(false);"+
										"s=$(\""+templ+"\");"+
										"var si=data.response.content.grouphtml.match(/<table>[\\s\\S]*<\\/table>/i)[0];"+
										"s.html(si);"+
										"s.attr('id',data.response.content.grouphtml.match(/<span class=\\\"fakelink\\\">(.*?)<\\\/span>/i)[1]);"+
										"s.attr('style','');"+//to make it visible (what a bug...)
										"var alphabetorder=$('div.item').filter(function(){"+
										"return ($(this).attr('id').toLowerCase()>s.attr('id').toLowerCase());"+ //only groups with letters after your term, then take the first and insert before
										"});"+
										"alphabetorder.first().before(s);"+ //alphabetcal insertion
										"$('div.favourite_groups').scrollTop(s.position().top-s.height());"+ //scroll to new insertes item
										"clickeventer();"+	//make the entry selectable								
										"if($('div.deepee-navtabs a.tab.selected').hasClass('left'))deaktsubmit(); else deaktfav();"+
									"}"+
								"}"+
								"if(wert!=2){var galleries = data.response.content.folders;"+//don't prove permissions when wert=2
									"$submit_to_groups.find('#gallery_selection > option').remove();"+
									"$.each(galleries, function(folderid, galleryname) { "+
											"$submit_to_groups.find('#gallery_selection').append('<option value=\"' + folderid + '\">' + galleryname + '<\/option>'); "+
										"});"+
									"$submit_to_groups.find('.option_2_box,.submit_button').show();"+
									"$submit_to_groups.find('.option_2_box').toggleClass('listmode', $submit_to_groups.find('.favourite_groups').is(':visible'));"+
									"if ($submit_to_groups.find('div.selected_group_info').length>0&&$submit_to_groups.find('input#manual_input').is(\":checked\")) {"+
										"$submit_to_groups.find('div.selected_group_info').replaceWith(data.response.content.grouphtml).show();"+
								"}}"+
							"}"+
						"} else {"+
							"if (data.response.content.groupname == groupname) {"+
								"$submit_to_groups.find('div.error_message').show().find('span').text(data.response.content.errormessage);"+
							"}"+
					   "}"+
					"});"+
					"DiFi.send();"+
				"};"+
				"function clickeventer(){$submit_to_groups.find('div.favourite_groups div.item').click(function(e) {"+ //makes groups selectable
					"$submit_to_groups.find('div.favourite_groups div.item').removeClass('selected');"+
					"groupname = $(this).addClass('selected').attr('id');"+
					"if($(this).attr('deakt')=='true')return true;"+ //just select but don't send permission-request when item has "deakt"-attribute
					"e.preventDefault();"+
					"$submit_to_groups.find('div.favourite_check img.groupname-check-img').show();"+
					 "$submit_to_groups.find('input[name=\"groupname\"]').val(groupname);"+
					"findOpenFolders();"+
			   "});}"+
			   "function deaktsubmit(){"+
			   "is_gallery=true;"+ //submitting-to-Gallery is clicked here, so grey out groups it is submitted to
			   "$('.second_option').html('Submitting to:');"+//I remove step 1, so here there should be a "2."
			   "var so=$('div.item[deakt]');"+
			   "so.css('background-color','#b2bbae');so.find('span').css('color','#ddd');so.attr('deakt','true');"+
			   "}"+			   
			   "$('.deepee-navtabs .first').click(deaktsubmit);"+
			   "function deaktfav(){"+
			   "$('.deepee-navtabs .last').click(function(){is_gallery=false;"+ //suggesting-to-Favourite is clicked. As I don't have a List of this, don't gray out.
			   "$('.second_option').html('Suggesting to:');"+//I remove step 1, so here there should be a "2."
			   "var so=$('div.item[deakt]');"+
			   "so.css('background-color','');so.find('span').css('color','');so.attr('deakt','false');});"+
			   "}"+
			   "$('.deepee-navtabs .last').click(deaktfav);");
			   
		// When there are no groups you are member of saved, try to get them now, start() is called again afer that
		if(grouplist.length==0){updatebutton();$("#dev_gle_update").click();return true;}

		$("div.item").first().css("display","");//make sure the first group-item is visible
		
		// var s=$("div.item").first().clone(false); //clone the first item into variable s. clone(true) clones also the events (no codeinsert needed) but works only in Firefox
		var s=$(templ);
		// s=s.children(":first").first();//clone the first item into variable s. clone(true) clones also the events (no codeinsert needed) but works only in Firefox
		// $("div.item").attr("dele","true"); //all existing groups should get deleted (otherwise more if and not ordered)
		$("div.item").remove();
		//take an entry of the list of groups you are member of, alters the s-clone to match the right properties, insert the clone, clone the clone into a new s-clone and repeat
		for(var i in grouplist){ 
			s.find("img").attr("src",grouplist[i].split(String.fromCharCode(1))[0]);
			s.attr("id",grouplist[i].split(String.fromCharCode(1))[1]);
			s.find(".fakelink").html(grouplist[i].split(String.fromCharCode(1))[1]);
			s.find(".group_tagline").html(grouplist[i].split(String.fromCharCode(1))[2]);
			s.html(s.html().replace(/(<img.*?)">/g,"$1\"/>").replace(/<br>/g,"<br/>"));
			$("#submit_to_groups_container.submit_to_groups_container div.ppp div.container div.favourite_groups").append(s);
			
			// $("div.item").first().before(s); //items will get inserted at the top, so grouplist is upside-down sorted.
			s=s.clone(false);
		}
		$("div.item[dele=true]").remove(); //remove all old list-entries
		
		//insert html for the collection-panel on the left. notable: the combobox is a textbox next to a dropdown that is so positioned that it appears to be one element. textbox and dropdown are connected via event-handler
		if($("#dev_group_col").length==0){
			$(".submit_to_groups .stream").append("<div id='dev_group_col'><div id='dev_group_col_title'>Group-Collections</div><div><input type='radio' id='group_stat1' checked='true' name='group_stat'/><label for='group_stat1'>Add</label><input type='radio' id='group_stat2' name='group_stat'/><label for='group_stat2'>Remove</label></div><span style='float: left;'>*</span><input type='text' id='dev_group_col_text'><select id='dev_group_col_add'></select><a class='gmbutton2 gmbutton2c' id='dev_group_but1'>OK<b></b></a><a id='dev_group_but2' class='gmbutton2 gmbutton2c'>Show<b></b></a></div>");
		 }
		
		colload();//load collection-options into dropdown-field
		
		//some nice event-handlers for clicking or typing somewhere. These are added, no replacement!
		//attribute clicker is set to not accidentally add more event-handlers to an element. 
		$("#dev_group_col_text").keypress(function(e){if(e.which==13){if($("#group_stat1:checked").length>0)coladd();else colrem();}});
		$("#dev_group_but1,#dev_group_but2").attr("onclick","return false;");
		$("#dev_group_but1:not([clicker])").click(function(){if($("#group_stat1:checked").length>0)coladd();else colrem();});
		$("#dev_group_but2:not([clicker])").click(function(){colshow();$("#group_list_search input").val("*"+$("#dev_group_col_add").val());});
		$("#dev_group_col_add:not([clicker])").change(function(){$("#dev_group_col_text").val($(this).val());});
		$("#dev_group_col_add:not([clicker]) option").click(function(){$("#dev_group_col_text").val($(this).html());});
		$("#dev_group_col_add:not([clicker])").keyup(function(){$("#dev_group_col_text").val($(this).val());});
		$("#dev_group_col_add:not([clicker]),#dev_group_but1:not([clicker]),#dev_group_but2:not([clicker])").attr("clicker","true");
		
		codeinsert("clickeventer();"); //makes all group-items clickable
		
		filter(); //shows groups that matches textbox. not necessary here, as textbox is empty and groups are already shown
				
		getaltgroups(); //gray out groups it is submitted to
		updatebutton(); //add the grouplist-update-button if not already added.
		
	}else{setTimeout(start,1000);grouplistalt =new Array();return true;} //if loading isn't ready yet, wait 1s.
}

//insert group-list-update-button and search-bar if not already inserted 
function updatebutton(){
	if($("#dev_gle_update").length==0){
		var but=$("<a></a>");
		but.html("Update list of groups<b></b>");
		but.attr("class","gmbutton2 gmbutton2c");
		but.attr('id',"dev_gle_update");
		$(".container").first().append(but);
		$("#dev_gle_update").click(function (){grouplist=new Array(); setTimeout(function(){
			$("#dev_gle_update").html("<img alt='loading groups' id='dev_group_list_loadingbutton' title='loading groups...' src='"+wartbild+"' style='position:relative;top:3px;margin-left:-10px;' />Update List of Groups<b></b>");
			getgroups(0,user);
		},0);});
		$(".submit_to_groups .container").prepend("<div id='group_list_search'>Search: <input type='text' /></div>");
		$("#group_list_search input").keyup(filter);
		
		//searchbarevent for leading #: search difi for the group and insert it in the list's top.
		codeinsert("$('#group_list_search input').keypress(function(e){"+
			"if(e.which==13&&$(this).val().indexOf('#')==0){"+
				"$('div.item').removeClass('selected');"+
				"var rex=new RegExp($.trim($(this).val()).substr(1),'i');"+ //search within groups case insensitive!
				"var alsel=$('div.favourite_groups div.item').filter(function(){"+
				"return ($(this).attr('id').search(rex)!=-1);"+
				"});"+
				"if(alsel.length==0){"+//no need to reload it when it is loaded
				"groupname = $(this).val();"+
				"findOpenFolders(1);"+ //will just add the group of groupnam to the list. 2 would check permissions, 0 is for internal use (update whole list)
				"}else{$(this).val(alsel.attr('id'));}"+
			"}});");
	}
}

if(!location.href.match(/AdServer/i)){ //some problems on deviantarts advertation-panels^^

//this is your name:

var user=$("td#oh-menu-deviant span.username-with-symbol span.username").html();
// document.getElementById("oh-menu-deviant").getElementsByClassName('oh-l')[0].getElementsByTagName('b')[0].innerHTML;
// var user="alexgphoto";

// listverzlad();

//this watches you and adds an event everytime the deviantart's javascript adds a submit-to-groups-link to the site.
function startwatch(){ 
	$(".submit_to_groups_button:not([gestart]) a").click(start);
	$(".submit_to_groups_button:not([gestart])").attr("gestart","true"); //only one event per click please^^
}

// start main script
setInterval(startwatch,1000);
}
})();
