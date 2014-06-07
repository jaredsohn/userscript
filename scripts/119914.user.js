// ==UserScript==
// @name Facebook with Google Maps
// @version 0.15
// @description Changes Bing Maps links on Facebook to Google Maps links.
// @match http://www.facebook.com/*
// @match https://www.facebook.com/*
// ==/UserScript==

try {
	var t,
		fbGmaps = {
	
			eventMap: null,
			infoMap: null,
			address: '',
			gmapsUrl: 'http://maps.google.com/maps?q=',
			gmapsLink: '',
			
			getPageType: function() {
				this.eventMap = document.getElementById('pagelet_event_details');
				this.infoMap = document.getElementById('pagelet_info') || document.getElementById('pagelet_profile_info');
				
				// This will replace check-in based maps some day…
				// this.checkInTimelineMap = document.querySelectorAll('.fbTimelineFlyoutMap .fbPlaceFlyout~a');
				
				if (!this.eventMap && !this.infoMap) {
					return;
				}
				
				this.initReplace();
			},
			
			getEventAddress: function() {
				var addressFragments = document.querySelectorAll('.fbPlaceFlyout .uiCollapsedList span.fsm.fwn.fcg'),
					i;
				
				if (!addressFragments.length) {
					return;
				}
				
				this.address = ''; // If some change happened earlier.
				
				for (i = 0; i < addressFragments.length; i++) {
					this.address += addressFragments[i].textContent + ' ';
				}
				
				this.address = this.address.substring(0, this.address.length - 1);
			},
			
			getInfoAddress: function() {
				var addressCont = document.querySelector('.uiInfoTable.profileInfoTable a[href^="http://bing.com/maps"]');

				this.address = addressCont.textContent;
			},
			
			createLink: function() {
				this.gmapsLink = this.gmapsUrl + encodeURI(this.address.replace(/\s/g, '+'));
			},
			
			replaceLinks: function() {
				var mapLinks = document.querySelectorAll('a[href^="http://bing.com/maps"]'),
					i;
					
				if (!mapLinks.length) {
					return;
				}
				
				for(i = 0; i < mapLinks.length; i++) {
					mapLinks[i].setAttribute('href', this.gmapsLink);
					mapLinks[i].setAttribute('target', '_blank');
					mapLinks[i].removeAttribute('rel');
				}
			},
			
			initReplace: function() {
				if (this.eventMap) {
					this.getEventAddress();
				}
				else {
					this.getInfoAddress();
				}	
	
				this.createLink();
				this.replaceLinks();
			}
			
		};
	
	// Must poll, because of Facebook's HTML5 history API usage,
	// Bing Maps links can be inserted dynamically into DOM.
	t = setInterval(function() {
			if (document.querySelectorAll('a[href^="http://bing.com/maps"]').length) {
				fbGmaps.getPageType();
			}
		}, 1000);
	
} catch (e) {}
