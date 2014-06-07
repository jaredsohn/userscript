// statusnet RTL support
// Copyright, benleevolk, 2009
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           statusnet RTL
// @namespace      http://userscripts.org/scripts/show/35593
// @include        http://identi.ca/*
// @include        https://identi.ca/*
// @include        http://*.identi.ca/*
// @include        https://*.identi.ca/*
// @include        http://*.status.net/*
// @include        https://*.status.net/*
// ==/UserScript==

var statusnetRTL={
	dentsCount:0,
	dentspanClassName:"entry-content",
	
	alignRTLLanguages: function () {
		var isThereRTLChars=/.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
		var dents=document.getElementsByClassName(this.dentspanClassName);
		this.dentsCount=dents.length;
		for (i=0;i<this.dentsCount;i++) {
			if (isThereRTLChars.test(dents[i].innerHTML)) {
				dents[i].style.direction="rtl";
				dents[i].style.textAlign="right";
				dents[i].style.display="block";
				dents[i].style.fontFamily="tahoma";
			}
		}
	},
	
	monitorChanges: function() {
		if (document.getElementsByClassName(this.dentspanClassName).length != this.dentsCount) {
			statusnetRTL.alignRTLLanguages();
		}
		setTimeout(statusnetRTL.monitorChanges, 200);
	}
}

setTimeout(statusnetRTL.monitorChanges, 200);


