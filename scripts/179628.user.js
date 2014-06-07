// ==UserScript==
// @name            Def Helper
// @author          Patricier
// @description     Some usefull tools to make life easier when it comes to deffing
// @include         http://*.tribalwars.nl/game.php?*&mode=incomings*&subtype=attacks*

// @version         0.5
// @grant           none
// ==/UserScript==
(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
	var rename = { //Object containing functions concerning renaming incs
		buttons : [],
		newName : function (name) { //Rename selected incs to certain name
				$('#incomings_table input[name*="id_"]').each(function (i) {
					if($(this).is(':checked')) {
					//Checkbox checked, rename and click on button
					$(this).next().next().children('input:first').val(name);
					console.log($(this).next().next().children('input:first').val());
					$(this).next().next().children('input:last').click();
				}
			});
		},
		createButtons : function () { //Create buttons from localstorage (if defined) else create buttons and save to localstorage
			if(loSto.get('def_help_buttons') != null) {
				rename.buttons = loSto.get('def_help_buttons');
			} else {
				rename.buttons = ['SNIPE','Snipe OK', 'DODGE', 'Dodge OK', 'EDEL', 'RAM'];
				loSto.add('def_help_buttons', rename.buttons);
			}
			$.each(rename.buttons, function(i) {
				
				var html = '<input class="btn rename_btn" type="button" value="'+rename.buttons[i]+'" />';
				console.log(html);
				$('.rename_option:first td').append(html);
			});
			$('.rename_btn').click(function () {
				rename.newName($(this).attr('value'));
			
			});
			var newRow = '<tr class="rename_option" style="display:none;"><td><input type="text" id="renameInput" /> <input id="renameInputButton" class="btn" type="button" value="Hernoem bevelen!" /></td>/tr>';
			$('.rename_option').after(newRow);
			$('#renameInputButton').click(function () {
				var name = $('#renameInput').val();
				rename.newName(name);
			});
		},
		addButtonScreen : function () { //Create a small screen to add and delete buttons
			var screen = "<div id='defHelpScreen' style='background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:300px;border-radius:7px;box-shadow:0 0 15px 1px #000000;'>";
			screen += '<b>Knoppen toevegen<br /></b>';
			screen += '<input type="text" id="newButton" /> <input type="button" class="btn" id="addTheButton" value="Toevoegen" />';
			screen += '<br /><br /><b>Knoppen verwijderen</b><br />';
			$.each(rename.buttons, function(i) {
				screen+= '<p><img id="'+i+'" class="deleteButton" src="http://cdn2.tribalwars.net/8.16/18743/graphic/delete_small.png?1d004"> '+rename.buttons[i]+'</p>';
			});
			screen += '<br /><a href="#" onclick="javascript: $(\'#defHelpScreen\').remove();location.reload();">Sluiten</a>';
			screen += '</div>';
			$(document.body).append(screen);
			$('.deleteButton').click(function () {
				position = $(this).attr('id');
				rename.buttons.splice(position,1);
				$(this).closest('p').remove();
				loSto.add('def_help_buttons', rename.buttons);
			});
			$('#addTheButton').click(function () {
				console.log('dik');
				rename.buttons.push($('#newButton').val());
				loSto.add('def_help_buttons', rename.buttons);
				$('#defHelpScreen p:last').after('<p><img id="'+(rename.buttons.length-1)+'" class="deleteButton" src="http://cdn2.tribalwars.net/8.16/18743/graphic/delete_small.png?1d004"> '+$('#newButton').val()+'</p>');
			});
		}
		
		

	}
	var id = { //Object containing functions concerning doing funny stuff with ID's
		sortDir : 'asc',
		hideID : function () { //Hide all the ID's
			$('#incomings_table tr').each(function (i) {
				if (i == 0 || i == ($('#incomings_table tr').length - 1)) { //Delete columns of first and last rows
					$(this).children('th:first').remove();
				} else { //Delete the rest
					$(this).children('td:first').remove();
				}
			});	
		},
		showID : function () { //Shows all the ID's in the most left column
			$('#incomings_table tr').each(function (i) {
				if (i == 0) { //First row
					$(this).children('th:first').before('<th>ID\'s</th>');
				} else if (i == ($('#incomings_table tr').length - 1)) { //Last row
					$(this).children('th:first').before('<th><input id="sortID" class="btn" type="button" value="Sorteer" /></th>');
				} else { //Rows containing attacks
					var id = $(this).children('td:first').children('input[name*="id_"]').attr('name').split('_')[1];
					$(this).children('td:first').before('<td>' + id + '</td>');
				}
			});
			$('#sortID').click(function() {
				id.sortID();
			});
		},
		sortID : function () {
			console.log(id.sortDir);
			function j(a) {
				var c = a.cells[0].textContent;
				console.log(c);
				var u = 0;
				u += parseInt(c) || 0;
				return u
			}
			void(function () {
				var s = $("tr[class*=\"row_\"]").sort(function (a, b) {
					if(id.sortDir=='asc') {
						id.sortDir='desc';
						return j(a) - j(b)
					} else {
						id.sortDir='asc';
						return j(b) - j(a)
					}
				});
				console.log(s);
				for (i = 0; i < $("tr[class*=\"row_\"]").length; i++) {
						$('#incomings_table tr:last').before(s[i])
				}
			})();
		}
		

	}
	var loSto = { //All functions concerning LocalStorage handling
		add : function (name, val) {
			localStorage.setItem(name, JSON.stringify(val));
			return;
		},
		del : function (name) {
			localStorage.removeItem(name);
		},
		get : function (name) {
			return JSON.parse(localStorage.getItem(name));
		}
			
	}

	//Create table with renaming tools
	var html = '<table id="def_rename" class="vis" style="width:100%;">';
	html+='<tbody><tr><th><img style="margin-right: 10px;" id="rename_options_toggle" class="down" src="http://cdn2.tribalwars.net/8.16/18741/graphic//icons/slide_down.png">Rename selected targets</th></tr><tr class="rename_option" style="display:none;"><td></td></tr>';
	html+='<tr><th><a href="#" id="addButtons">Knoppen toevoegen of verwijderen</a></th></tr>';
	html+='</tbdoy></table>';
	$('#incomings_table').before(html);
	$('#rename_options_toggle').click(function () {
		if($(this).attr('class')=='down') {
			$(this).attr({'src':'http://cdn2.tribalwars.net/8.16/18741/graphic//icons/slide_up.png','class':'up'});
		} else {
			$(this).attr({'src':'http://cdn2.tribalwars.net/8.16/18741/graphic//icons/slide_down.png','class':'down'});
			
		}
		$('.rename_option').each(function() {
			$(this).toggle();
		});
	});
	$('#addButtons').click(function () {
		rename.addButtonScreen();
	});
	rename.createButtons();
	$('.btn:last').after('<input type="button" class="btn" id="showID" value="ID\'s tonen" />');
	$('#showID').click(function () {
		id.showID();
		$(this).attr('disabled','true');
	});
})