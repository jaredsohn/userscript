// ==UserScript==
// @name           Amazon Gold Box Alert
// @namespace      lecapitan
// @description    Alerts you when a new Gold Box deal is available.
// @include        http://www.amazon.com/gp/goldbox*
// @resource       res_notifyaudio http://gmflowplayer.googlecode.com/files/notify.wav
// @resource	   res_updateicon http://cdn1.iconfinder.com/data/icons/fugue/icon/arrow_circle_double.png
// ==/UserScript==

document.gbobject = 
{
	AlertElement: undefined,
	AudioElement: undefined,
	UpdateImage: undefined,
		
	GetLightningDealsDivList: function()
		{
			return document.getElementsByClassName('gbox-la-hide-tab');
		},
		
	GetDealDivAvailability: function(dealdiv)
		{
			var spanList = dealdiv.getElementsByTagName('span');
			for (var i = 0; i < spanList.length; i++) {
				if (spanList[i].id.indexOf('gbox-la-availability') == 0) {
					return spanList[i].innerHTML;
				}
			}
			return undefined;
		},
		
	GetDealDivTimeRemaining: function(dealdiv)
		{
			var spanList = dealdiv.getElementsByTagName('span');
			for (var i = 0; i < spanList.length; i++) {
				if (spanList[i].id.indexOf('gbox-la-time-remaining') == 0) {
					return spanList[i].innerHTML.replace(/<\/?b>| |remaining/g, '');
				}
			}
			return undefined;
		},
		
	GetDealDivPercentClaimed: function(dealdiv)
		{
			var divList = dealdiv.getElementsByTagName('div');
			for (var i = 0; i < divList.length; i++) {
				if (divList[i].id.indexOf('gbox-la-progress-bar') == 0) {
					return divList[i].innerHTML;
				}
			}
			return undefined;
		},
		
	GetDealDivStartTime: function(dealdiv)
		{
			var spanList = dealdiv.getElementsByTagName('span');
			for (var i = 0; i < spanList.length; i++) {
				if (spanList[i].id.indexOf('gbox-la-start-timer') == 0) {
					return spanList[i].innerHTML;
				}
			}
			return undefined;
		},
		
	CheckNextItem: function(nextDealDiv)
		{
			if (nextDealDiv) {
				var startTime = this.GetDealDivStartTime(nextDealDiv);
				this.AlertElement.innerHTML += 'Next deal starts in ' + startTime + "...";
				// Sound the alarm
				if (startTime.substring(0, 5) == "00:00") {
					if (parseInt(startTime.substring(6, 8)) < 10) {
						document.title = 'Next Item Soon!';
						this.AudioElement.play();
					}
					if (parseInt(startTime.substring(6, 8)) < 3) {
						document.title = 'NEXT ITEM!';
					}
				}
			}
			else {
				this.AlertElement.innerHTML += 'No more items for today.';
			}
			// Add update link
			this.AlertElement.appendChild(this.UpdateImage);
		},
		
	Update: function()
		{
			try {
				document.title = 'Amazon Gold Box';
				var dealDivList = this.GetLightningDealsDivList();
				for (var i = 0; i < dealDivList.length; i++) {
					if (this.GetDealDivAvailability(dealDivList[i]) == 'Available') { // Current item is for sale
						var timeRemaining = this.GetDealDivTimeRemaining(dealDivList[i]);
						var percentClaimed = this.GetDealDivPercentClaimed(dealDivList[i]);
						this.AlertElement.innerHTML = 'Sale is active. ' + percentClaimed + '. ';
						this.CheckNextItem(dealDivList[i+1]);
					}
					if (this.GetDealDivAvailability(dealDivList[i]) == 'Sold Out!') { // Current item is sold out
						this.AlertElement.innerHTML = 'Item is sold out. ';
						this.CheckNextItem(dealDivList[i+1]);
					}
				}
			}
			catch (e) {
				console.log(e);
			}
			// Update
			window.setTimeout(tick, 1000);
		},
		
	Insert: function()
		{
			var globalHeader = document.getElementById('navbar');
			var alertDiv = document.createElement('div');
			alertDiv.style.textAlign = 'center';
			alertDiv.style.padding = '8px';
			alertDiv.style.borderBottom = '1px solid #999999';
			alertDiv.style.background = '#B3ECFF';
			alertDiv.innerHTML = 'waiting...';
			globalHeader.appendChild(alertDiv);
			this.AlertElement = alertDiv;
			
			var audio = document.createElement('audio');
			audio.src = 'data:audio/wav;base64,' + GM_getResourceURL("res_notifyaudio").split('data:application/octet-stream;base64,')[1];
			alertDiv.appendChild(audio);
			this.AudioElement = audio;
			
			var updateImage = document.createElement('img');
			updateImage.src = GM_getResourceURL('res_updateicon');
			updateImage.onclick = function() { window.open('http://userscripts.org/scripts/show/127020'); };
			updateImage.style.cursor = 'pointer';
			updateImage.alt = 'update this script';
			this.UpdateImage = updateImage;
			
			tick();
		}
}

function tick() {
	document.gbobject.Update();
}

document.gbobject.Insert();