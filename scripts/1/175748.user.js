// ==UserScript==
// @name           orderlist hotfix
// @author         forest w
// @namespace	        
// @description	   group child items in orderlist
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js
// @include        http://*.eventsonline.ca/*
// @include        https://*.eventsonline.ca/*
// @grant       GM_addStyle
// ==/UserScript==




    //check/uncheck all grouped child items when parent is clicked
	//trigger when checkbox is toggled
    $(":checkbox").click(function() {
		//process if a parent order is clicked
		if ($(this).parent().parent().hasClass("parentOrder")) {
			var $id = $(this).parent().next().text(); //record the parent id
			var $newID = "parentId_" + $id; //store the class name for child items
			var parentCheck = $(this).attr('checked'); //store whether the parent item is checked or not
			
			//compatibility check... 
			if (parentCheck == 'checked' || parentCheck == true ) {
				parentCheck= true;
			} else {
				parentCheck= false;
			}
			
			
			//alert(parentCheck);
			//find all child items with the parent id
			$(this).parent().parent().parent().find('tr').each(function() {
				//if the tr has the parent id then find all checkbox within the <td><input class=checkbox>
				if ($(this).hasClass($newID)) {
					$(this).find(':checkbox').each(function() {

					
						$(this).attr('checked', parentCheck);
					});
				}
				
			});
		}
	});




