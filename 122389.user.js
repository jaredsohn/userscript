// ==UserScript==
// @name           basecamp_messages_to_todolists
// @namespace      com.lawrencealan.basecamp
// @require				 http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        https://*.basecamphq.com/projects/*
// ==/UserScript==

/* task button css object */
var taskbuttoncss = {
	'padding': '4px 8px',
	'marginTop':'-44px',
	'background': '#eee',
	'border': '1px solid #ddd',
	'fontSize': '11px',
	'display': 'inline',
	'cursor':'pointer',
	'clear':'both',
	'position': 'absolute',
	'right': '61px',
	'width': '130px',
	'text-align': 'center'
};

/* global variables */
var count_initial=-1, count_interval;


$(function(){
	var datastr = GM_getValue('to_task_data');
	data = $.parseJSON(datastr);

	/* are we on the todo list page, and do we have a pending automated task (step>=1) */
	if(unsafeWindow.TodoLists!=null && unsafeWindow.location.href.indexOf('todo_lists') > -1) {

		if(datastr != null) {
			if(data.step == 1) {


				data.step=2;

				/* setup the interface and add a new list using basecamp javascript engine */
				unsafeWindow.TodoLists.resetNewListForm(); ;
				unsafeWindow.Layout.swapWithScreenBody('new_list');

				/* set the list title and description */
				$('#todo_list_name').val(data.title);
				$('#todo_list_description').val(data.desc);

				/* save the task data, with the new step value, for the next sequence */
				GM_setValue("to_task_data", JSON.stringify(data));

				/* get the initial number of todo lists */
				count_initial = $('.widget.page_widget.list_wrapper.false').length;

				/* emulate a click on the add list button*/
				$('form#new_list_form.new_todo_list div.submit p input').first().click();

				/* set timer to wait and check for change in the number of todo list widgets */
				count_interval = setInterval(function(data){
					var parts = $('.widget.page_widget.list_wrapper.false');

					/* check list count, if it's the same or not set, return */
					if(parts.length==count_initial||count_initial==-1) return;

					/* otherwise, clear the timer and continue */
					clearInterval(count_interval);

					/* get the newly added todo list */
					var a = $(parts[0]);

					/* add each of the items from the message (either the body, or LI elements from the body */
					$.each(data.items,function(idx,value){
						$(a.find('form.todo_item p textarea.new_item_field').get(0)).val(value);
						$(a.find('form.todo_item p.submit input').get(0)).click();
					});

					/* set responsible party to "me" */
					a.find('select[name="todo_item[responsible_party_code]"]')[0].selectedIndex = 1;

					/* clear the task data, because we are done! */
					GM_deleteValue("to_task_data");
					delete data, parts, count_initial, count_interval;

				},100,data);
			}
		}
	} else {

		/* no pending tasks, let's check the document location to see if we are in a message view */
		var to_task_button;
		switch(true){
			case (unsafeWindow.location.href.match(/posts\/.*\/comments/)!=null):
			/* in a message view! set up the button */
			to_task_button = $('<div id="_to_task">Convert To To-Do List</div>');
			to_task_button.attr('title','Automatically convert this message to a to-do list');
			to_task_button.css(taskbuttoncss);

			/* click handler for the button */
			to_task_button.click(function(){

				/* get the title and body */
				var title = $('div.Left div.col div.innercol div.message_header h2').text();
				var body = $('#OriginalPost').html();

				/* get the items from the message */
				var items = [];

				/* if we have LI elements, use those for the to-do items */
				if(body.indexOf('<li')>-1) {  $('#OriginalPost li').each(function(){   items.push($(this).html().replace(/<(?!br)[^>]+>/,""));  });   }
				/* otherwise, use the message body */
				else { items.push($('#OriginalPost').html().replace(/<(?!br)[^>]+>/,"")); }

					/* store the task list data with greasemonkey so we can access it later */
					GM_setValue("to_task_data", JSON.stringify({title:title,body:body,items:items,step:1}));

					/* redirect to the to-do list page for the project */
					var url = unsafeWindow.location.href;
					url = url.split('posts')[0]+'todo_lists';
					unsafeWindow.location.replace(url);

				});
				/* insert the button after the message body */
				$('#OriginalPost').after(to_task_button);

				/* if we are coming from the message list view, automate the click */
				if(data.step==0) to_task_button.click();

				break;
				case (unsafeWindow.location.href.match(/^.*\/posts$/)!=null):

				/* in expanded message list view! set up the button */
				to_task_button = $('<a style="cursor:pointer;" id="_to_task">Convert To To-Do List</a>');
				to_task_button.attr('title','Automatically convert this message to a to-do list');


				/* click handler for the button */
				to_task_button.click(function(){
					GM_setValue("to_task_data", JSON.stringify({step:0}));
					var first = $(this).parent().children('a')[0];
					unsafeWindow.location.replace(first.href);
				});

				/* insert the link in next to the "Go to message" link after the message body */
				$('div.message p.permalink').append('<span> | </span>');
				$('div.message p.permalink').append(to_task_button);
				break;
				default:
				break;
			}

		}
	});
