// ==UserScript==
// @name           Sync multiple Apps (Google Play)
// @namespace      sync_multiple_apps
// @description	   Display checkbox to choose application you want to install.
// @include        https://play.google.com/apps
// @require		   http://code.jquery.com/jquery-latest.js
// @run-at		   document-end
// ==/UserScript==

jQuery(function($) {
	var wrap = document.createElement('div');
	var selDevices = document.createElement('select');
	var btnInstallSelectedApp = document.createElement('input');
	var initProps = unsafeWindow.initProps;
	var $oPopup = $(document.createElement('div'));
	$oPopup.attr({id: 'multiple_app_installer', style: 'position: fixed; top: 10px; right: 10px;'});
	$oPopup.appendTo('body');
	function mai_popup() {
		this.parent = $oPopup;
		this.addItem = function(pkg_name) {
			var item = document.createElement('div');
			item.innerHTML = 'Syncing: "'+pkg_name+'"';
			$(item).attr('style', 'display: none');
			$(item).appendTo(this.parent);
			$(item).slideDown('normal', function() {
				$(this).delay(2000).slideUp();
			});
		};
	}
	window.cPopup = new mai_popup();

	$('.carousel-page > div.goog-inline-block').hover(function() {
		$(this).css('background-color', '#eee');
	}, function() {
		var chkInstall = $('.mark_install', this)
		if(chkInstall.attr('checked')) {
			$(this).css('background-color', '#eee');
		} else {
			$(this).css('background-color', 'transparent');
		}
	}).css({position: 'relative', 'border-radius': '5px', cursor: 'pointer'});
	$('.carousel-page > div.goog-inline-block').each(function(index) {
		$(this).click(function(event) {
			var chkInstall = $('.mark_install', this)

			chkInstall.attr('checked', chkInstall.attr('checked') ? false : true);
		});
		aBuyButton = $(this).find('.buy-button').eq(0);
		installed = $(this).find('.buy-button-price').eq(0).html().toLowerCase() == 'installed' ? true : false;
		if(aBuyButton && !installed && (aBuyButton.data('isfree') == true || aBuyButton.data('ispurchased') == true))
			$('<input class="mark_install" style="position: absolute; right: 3px; bottom: 3px;" type="checkbox" value="'+this.id+'" />').appendTo(this);
	});

	if(initProps) {
		if(initProps.devices) {
			for(i in initProps.devices) {
				oOpt = document.createElement('option');
				oOpt.value = i;
				oOpt.text = initProps.devices[i];
				selDevices.add(oOpt);
			}
		}
		$(wrap).attr('style', 'float: right; font-size: 12px;');
		$(selDevices).appendTo(wrap);
		btnInstallSelectedApp.type = 'button';
		btnInstallSelectedApp.value = 'Sync selected Apps';
		$(btnInstallSelectedApp).click(function(event) {
			$('.carousel-page input:checked.mark_install').each(function() {
				$.ajax({
					type: 'POST',
					dataType: 'text',
					url: 'https://play.google.com/store/install',
					data: {device: selDevices.value, id: this.value, offerType: 1, token: initProps.token, xhr: 1},
					beforeSend: function(jqXHR, settings) {
						jqXHR.id = settings.app_id;
						jqXHR.app_title = settings.app_title;
					},
					error: function(jqXHR, textStatus, errorThrown) {
						alert(textStatus + ': ' + errorThrown);
					},
					success: function(data, textStatus, jqXHR) {
						$('div[id="'+jqXHR.id+'"] input.mark_install').remove();
						$('#'+jqXHR.id).css('background-color', 'transparent');
						cPopup.addItem('Synced <strong>'+jqXHR.app_title+'</strong> to your phone.');
					},
					app_id: this.value,
					app_title: $(this).parent().find('a.title:eq(0)').attr('title')
				});
			})
		});
		$(btnInstallSelectedApp).appendTo(wrap);
		$(wrap).appendTo($('#my-library-app-fragment-header-text'));
	}
})
