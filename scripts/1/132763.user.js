// ==UserScript==
// @name	SecretWar Deploy All Button
// @namespace	http://secretwar.thesecretworld.com/deployment
// @description	Script to create a Deploy All Button for the Secret War
// @version	0.6
// @include	http://secretwar.thesecretworld.com/*
// ==/UserScript==

// List of countries
// Format: <CountryName No spaces> : { value: <country value>, name: "<Country Name with Spaces>"},
var countriesList = {
57 : { value: 57, name: "Afghanistan"},
58 : { value: 58, name: "Akrotiri"},
1 : { value: 1, name: "Alabama"},
2 : { value: 2, name: "Alaska"},
59 : { value: 59, name: "Albania"},
60 : { value: 60, name: "Algeria"},
61 : { value: 61, name: "American Samoa"},
62 : { value: 62, name: "Andorra"},
63 : { value: 63, name: "Angola"},
315 : { value: 315, name: "Anguilla"},
64 : { value: 64, name: "Anguilla Antarctica"},
65 : { value: 65, name: "Antigua and Barbuda"},
67 : { value: 67, name: "Argentina"},
4 : { value: 4, name: "Arizona"},
5 : { value: 5, name: "Arkansas"},
68 : { value: 68, name: "Armenia"},
69 : { value: 69, name: "Aruba"},
70 : { value: 70, name: "Ashmore and Cartier Islands"},
72 : { value: 72, name: "Australia"},
73 : { value: 73, name: "Austria"},
74 : { value: 74, name: "Azerbaijan"},
76 : { value: 76, name: "Bahrain"},
77 : { value: 77, name: "Bangladesh"},
78 : { value: 78, name: "Barbados"},
79 : { value: 79, name: "Belarus"},
80 : { value: 80, name: "Belgium"},
81 : { value: 81, name: "Belize"},
82 : { value: 82, name: "Benin"},
83 : { value: 83, name: "Bermuda"},
84 : { value: 84, name: "Bhutan"},
85 : { value: 85, name: "Bolivia"},
86 : { value: 86, name: "Bosnia and Herzegovina"},
87 : { value: 87, name: "Botswana"},
88 : { value: 88, name: "Bouvet Island"},
89 : { value: 89, name: "Brazil"},
90 : { value: 90, name: "British Indian Ocean Territory"},
91 : { value: 91, name: "British Virgin Islands"},
306 : { value: 306, name: "British Virgin Islands"},
92 : { value: 92, name: "Brunei"},
93 : { value: 93, name: "Bulgaria"},
94 : { value: 94, name: "Burkina Faso"},
95 : { value: 95, name: "Burma"},
96 : { value: 96, name: "Burundi"},
6 : { value: 6, name: "California"},
97 : { value: 97, name: "Cambodia"},
98 : { value: 98, name: "Cameroon"},
99 : { value: 99, name: "Canada"},
100 : { value: 100, name: "Cape Verde"},
101 : { value: 101, name: "Cayman Islands"},
102 : { value: 102, name: "Central African Republic"},
103 : { value: 103, name: "Chad"},
104 : { value: 104, name: "Chile"},
105 : { value: 105, name: "China"},
106 : { value: 106, name: "Christmas Island"},
107 : { value: 107, name: "Clipperton Island"},
108 : { value: 108, name: "Cocos (Keeling) Islands"},
109 : { value: 109, name: "Colombia"},
7 : { value: 7, name: "Colorado"},
110 : { value: 110, name: "Comoros"},
8 : { value: 8, name: "Connecticut"},
113 : { value: 113, name: "Coral Sea Islands"},
114 : { value: 114, name: "Costa Rica"},
3 : { value: 3, name: "Cote d'Ivoire"},
116 : { value: 116, name: "Croatia"},
117 : { value: 117, name: "Cuba"},
118 : { value: 118, name: "Curacao"},
119 : { value: 119, name: "Cyprus"},
120 : { value: 120, name: "Czech Republic"},
9 : { value: 9, name: "Delaware"},
111 : { value: 111, name: "Democratic Republic of the Congo"},
121 : { value: 121, name: "Denmark"},
122 : { value: 122, name: "Dhekelia"},
10 : { value: 10, name: "District of Columbia"},
123 : { value: 123, name: "Djibouti"},
124 : { value: 124, name: "Dominica"},
125 : { value: 125, name: "Dominican Republic"},
126 : { value: 126, name: "Ecuador"},
127 : { value: 127, name: "Egypt"},
128 : { value: 128, name: "El Salvador"},
129 : { value: 129, name: "Equatorial Guinea"},
130 : { value: 130, name: "Eritrea"},
131 : { value: 131, name: "Estonia"},
132 : { value: 132, name: "Ethiopia"},
133 : { value: 133, name: "European Union"},
134 : { value: 134, name: "Falkland Islands (Islas Malvinas)"},
135 : { value: 135, name: "Faroe Islands"},
207 : { value: 207, name: "Federated States of Micronesia"},
136 : { value: 136, name: "Fiji"},
137 : { value: 137, name: "Finland"},
11 : { value: 11, name: "Florida"},
138 : { value: 138, name: "France"},
139 : { value: 139, name: "French Guiana"},
141 : { value: 141, name: "Gabon"},
12 : { value: 12, name: "Georgia"},
144 : { value: 144, name: "Georgia"},
145 : { value: 145, name: "Germany"},
146 : { value: 146, name: "Ghana"},
147 : { value: 147, name: "Gibraltar"},
148 : { value: 148, name: "Greece"},
149 : { value: 149, name: "Greenland"},
150 : { value: 150, name: "Grenada"},
316 : { value: 316, name: "Guadeloupe"},
151 : { value: 151, name: "Guam"},
152 : { value: 152, name: "Guatemala"},
153 : { value: 153, name: "Guernsey"},
154 : { value: 154, name: "Guinea"},
155 : { value: 155, name: "Guinea-Bissau"},
156 : { value: 156, name: "Guyana"},
157 : { value: 157, name: "Haiti"},
14 : { value: 14, name: "Hawaii"},
158 : { value: 158, name: "Heard Island and McDonald Islands"},
159 : { value: 159, name: "Holy See (Vatican City)"},
160 : { value: 160, name: "Honduras"},
161 : { value: 161, name: "Hong Kong"},
162 : { value: 162, name: "Hungary"},
163 : { value: 163, name: "Iceland"},
15 : { value: 15, name: "Idaho"},
16 : { value: 16, name: "Illinois"},
164 : { value: 164, name: "India"},
17 : { value: 17, name: "Indiana"},
166 : { value: 166, name: "Indonesia"},
18 : { value: 18, name: "Iowa"},
167 : { value: 167, name: "Iran"},
168 : { value: 168, name: "Iraq"},
169 : { value: 169, name: "Ireland"},
171 : { value: 171, name: "Israel"},
172 : { value: 172, name: "Italy"},
173 : { value: 173, name: "Jamaica"},
174 : { value: 174, name: "Jan Mayen"},
175 : { value: 175, name: "Japan"},
176 : { value: 176, name: "Jersey"},
177 : { value: 177, name: "Jordan"},
19 : { value: 19, name: "Kansas"},
178 : { value: 178, name: "Kazakhstan"},
20 : { value: 20, name: "Kentucky"},
179 : { value: 179, name: "Kenya"},
180 : { value: 180, name: "Kiribati"},
183 : { value: 183, name: "Kosovo"},
184 : { value: 184, name: "Kuwait"},
185 : { value: 185, name: "Kyrgyzstan"},
319 : { value: 319, name: "La Reunion"},
186 : { value: 186, name: "Laos"},
187 : { value: 187, name: "Latvia"},
188 : { value: 188, name: "Lebanon"},
189 : { value: 189, name: "Lesotho"},
190 : { value: 190, name: "Liberia"},
191 : { value: 191, name: "Libya"},
192 : { value: 192, name: "Liechtenstein"},
193 : { value: 193, name: "Lithuania"},
21 : { value: 21, name: "Louisiana"},
194 : { value: 194, name: "Luxembourg"},
195 : { value: 195, name: "Macau"},
196 : { value: 196, name: "Macedonia"},
197 : { value: 197, name: "Madagascar"},
22 : { value: 22, name: "Maine"},
198 : { value: 198, name: "Malawi"},
199 : { value: 199, name: "Malaysia"},
200 : { value: 200, name: "Maldives"},
201 : { value: 201, name: "Mali"},
202 : { value: 202, name: "Malta"},
203 : { value: 203, name: "Marshall Islands"},
317 : { value: 317, name: "Martinique"},
23 : { value: 23, name: "Maryland"},
24 : { value: 24, name: "Massachusetts"},
204 : { value: 204, name: "Mauritania"},
205 : { value: 205, name: "Mauritius"},
206 : { value: 206, name: "Mexico"},
25 : { value: 25, name: "Michigan"},
26 : { value: 26, name: "Minnesota"},
27 : { value: 27, name: "Mississippi"},
28 : { value: 28, name: "Missouri"},
208 : { value: 208, name: "Moldova"},
210 : { value: 210, name: "Mongolia"},
29 : { value: 29, name: "Montana"},
211 : { value: 211, name: "Montenegro"},
212 : { value: 212, name: "Montserrat"},
213 : { value: 213, name: "Morocco"},
214 : { value: 214, name: "Mozambique"},
215 : { value: 215, name: "Namibia"},
216 : { value: 216, name: "Nauru"},
217 : { value: 217, name: "Navassa Island"},
30 : { value: 30, name: "Nebraska"},
218 : { value: 218, name: "Nepal"},
219 : { value: 219, name: "Netherlands"},
314 : { value: 314, name: "Netherlands Antilles"},
31 : { value: 31, name: "Nevada"},
220 : { value: 220, name: "New Caledonia"},
32 : { value: 32, name: "New Hampshire"},
33 : { value: 33, name: "New Jersey"},
34 : { value: 34, name: "New Mexico"},
35 : { value: 35, name: "New York"},
221 : { value: 221, name: "New Zealand"},
222 : { value: 222, name: "Nicaragua"},
223 : { value: 223, name: "Niger"},
224 : { value: 224, name: "Nigeria"},
225 : { value: 225, name: "Niue"},
226 : { value: 226, name: "Norfolk Island"},
36 : { value: 36, name: "North Carolina"},
37 : { value: 37, name: "North Dakota"},
181 : { value: 181, name: "North Korea"},
227 : { value: 227, name: "Northern Mariana Islands"},
228 : { value: 228, name: "Norway"},
39 : { value: 39, name: "Ohio"},
40 : { value: 40, name: "Oklahoma"},
229 : { value: 229, name: "Oman"},
41 : { value: 41, name: "Oregon"},
231 : { value: 231, name: "Pakistan"},
232 : { value: 232, name: "Palau"},
233 : { value: 233, name: "Panama"},
234 : { value: 234, name: "Papua New Guinea"},
235 : { value: 235, name: "Paracel Islands"},
236 : { value: 236, name: "Paraguay"},
42 : { value: 42, name: "Pennsylvania"},
237 : { value: 237, name: "Peru"},
238 : { value: 238, name: "Philippines"},
239 : { value: 239, name: "Pitcairn Islands"},
240 : { value: 240, name: "Poland"},
241 : { value: 241, name: "Portugal"},
242 : { value: 242, name: "Puerto Rico"},
243 : { value: 243, name: "Qatar"},
112 : { value: 112, name: "Republic of the Congo"},
44 : { value: 44, name: "Rhode Island"},
244 : { value: 244, name: "Romania"},
245 : { value: 245, name: "Russia"},
246 : { value: 246, name: "Rwanda"},
247 : { value: 247, name: "Saint Barthelemy"},
248 : { value: 248, name: "Saint Helena"},
249 : { value: 249, name: "Saint Kitts and Nevis"},
250 : { value: 250, name: "Saint Lucia"},
251 : { value: 251, name: "Saint Martin"},
252 : { value: 252, name: "Saint Pierre and Miquelon"},
253 : { value: 253, name: "Saint Vincent and the Grenadines"},
254 : { value: 254, name: "Samoa"},
255 : { value: 255, name: "San Marino"},
256 : { value: 256, name: "Sao Tome and Principe"},
257 : { value: 257, name: "Saudi Arabia"},
258 : { value: 258, name: "Senegal"},
259 : { value: 259, name: "Serbia"},
260 : { value: 260, name: "Seychelles"},
261 : { value: 261, name: "Sierra Leone"},
262 : { value: 262, name: "Singapore"},
263 : { value: 263, name: "Sint Maarten"},
264 : { value: 264, name: "Slovakia"},
265 : { value: 265, name: "Slovenia"},
266 : { value: 266, name: "Solomon Islands"},
267 : { value: 267, name: "Somalia"},
268 : { value: 268, name: "South Africa"},
45 : { value: 45, name: "South Carolina"},
46 : { value: 46, name: "South Dakota"},
269 : { value: 269, name: "South Georgia and South Sandwich Islands"},
182 : { value: 182, name: "South Korea"},
271 : { value: 271, name: "South Sudan"},
272 : { value: 272, name: "Spain"},
273 : { value: 273, name: "Spratly Islands"},
274 : { value: 274, name: "Sri Lanka"},
275 : { value: 275, name: "Sudan"},
276 : { value: 276, name: "Suriname"},
277 : { value: 277, name: "Svalbard"},
278 : { value: 278, name: "Swaziland"},
279 : { value: 279, name: "Sweden"},
280 : { value: 280, name: "Switzerland"},
281 : { value: 281, name: "Syria"},
282 : { value: 282, name: "Taiwan"},
283 : { value: 283, name: "Tajikistan"},
284 : { value: 284, name: "Tanzania"},
47 : { value: 47, name: "Tennessee"},
48 : { value: 48, name: "Texas"},
285 : { value: 285, name: "Thailand"},
75 : { value: 75, name: "The Bahamas"},
142 : { value: 142, name: "The Gambia"},
286 : { value: 286, name: "Timor-Leste"},
287 : { value: 287, name: "Togo"},
288 : { value: 288, name: "Tokelau"},
289 : { value: 289, name: "Tonga"},
290 : { value: 290, name: "Trinidad and Tobago"},
291 : { value: 291, name: "Tunisia"},
292 : { value: 292, name: "Turkey"},
293 : { value: 293, name: "Turkmenistan"},
294 : { value: 294, name: "Turks and Caicos Islands"},
295 : { value: 295, name: "Tuvalu"},
296 : { value: 296, name: "Uganda"},
297 : { value: 297, name: "Ukraine"},
298 : { value: 298, name: "United Arab Emirates"},
299 : { value: 299, name: "United Kingdom"},
300 : { value: 300, name: "United States"},
301 : { value: 301, name: "Uruguay"},
52 : { value: 52, name: "US Virgin Islands"},
49 : { value: 49, name: "Utah"},
302 : { value: 302, name: "Uzbekistan"},
303 : { value: 303, name: "Vanuatu"},
304 : { value: 304, name: "Venezuela"},
50 : { value: 50, name: "Vermont"},
305 : { value: 305, name: "Vietnam"},
51 : { value: 51, name: "Virginia"},
307 : { value: 307, name: "Wake Island"},
308 : { value: 308, name: "Wallis and Futuna"},
53 : { value: 53, name: "Washington"},
309 : { value: 309, name: "West Bank"},
54 : { value: 54, name: "West Virginia"},
310 : { value: 310, name: "Western Sahara"},
55 : { value: 55, name: "Wisconsin"},
56 : { value: 56, name: "Wyoming"},
311 : { value: 311, name: "Yemen"},
312 : { value: 312, name: "Zambia"},
313 : { value: 313, name: "Zimbabwe"},
};

var TSW_DeployItems = {};

// URL to the Secret War AMF gateway
var url = "http://secretwar.thesecretworld.com/amf_gateway";
// Pre-encoded request for a list of deployable agents
var get_deployable_agents_amf = '\x00\x00\x00\x00\x00\x01\x00!application.get_deployable_agents\x00\x02/1\x00\x00\x00\x00\n\x00\x00\x00\x00';
// Maximum number of agents to send out per cycle
var depNum = 6;

// Send one AMF request, call callback(decoded result) on success
// Fairly standard "send request, get data" except it requires Firefox' sendAsBinary() method that will prevent the browser from declaring binary data as plain text
function requestAMF(data, callback) {
	var req = new XMLHttpRequest();
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-amf");
	req.setRequestHeader("Accept", "*/*");
	req.setRequestHeader("Cookie", document.cookie);
	req.onreadystatechange = function() {
		if(req.readyState == 4 && req.status == 200) {
			callback(req.responseText);	
		}
	}
	req.sendAsBinary(data);
}

// Build a request for deploying agents
// This would look cleaner with a real AMF library 
function deploy_agents_amf(agents, location) {
	var req = '\x00\x03\x00\x00\x00\x01\x00\x19application.deploy_agents\x00\x03/10';
	var body = '\n\x00\x00\x00\x01\x11\n\x0b\x01\x13agent_ids\t';
	body += String.fromCharCode(agents.length * 2 + 1) + '\x01';
	for(var i=0; i<agents.length; ++i) body += '\x06' + String.fromCharCode(agents[i].length * 2 + 1) + agents[i];
	body += '\x17location_id\x06' + String.fromCharCode(location.length * 2 +  1) + location + '\x01';
	var blen = body.length;
	var ln = '';
	for(var i=0; i<4; ++i) {
		ln = String.fromCharCode(blen%256) + ln;
		blen /= 256;
	}
	return req + ln + body;
}

// Grep out agent ids from data as returned by get_deployable_agents
// I tried parsing the result with a pure JavaScript AMF library I found on the interwebs, but it was too slow, so here goes the quick and dirty version
function grep_agent_ids(data) {
	agents = Array();
	data = data.split("\vfacebook_id\x02");
	if(data[0].indexOf("\x02id\x00") > 0) agents.push("0");
	for(var i=0; i<data.length; ++i) {
		d = data[i].split("\x02id\x02")[1];
		if(d) agents.push(d.substr(2, d.length-3));
	}
	return agents;
}

// Utility function for adding options to dropdown
function addOption(selectbox, text, value ) { 
	var optn = document.createElement("OPTION"); 
	optn.text = text; 
	optn.value = value; 
	selectbox.add(optn, null);
} 

// Initialize document elements
function init_elements() {
	if (document.getElementById("deploy-all-button")) {
		return;
	}

	// Create button frame and set style
	buttonFrame = document.createElement("div");
	buttonFrame.setAttribute("id", "deploy-all-button");
	document.getElementsByTagName("body")[0].appendChild(buttonFrame);
	buttonFrame.style.border = "4px solid #0101DF";
	buttonFrame.style.background = "#00BFFF";
	buttonFrame.style.position = "absolute";
	buttonFrame.style.left = "10px";
	buttonFrame.style.top = "10px";
	buttonFrame.style.padding = "10px";
	buttonFrame.innerHTML = "Waiting...";
	TSW_DeployItems.mainFrame = buttonFrame;

	// Create dropdown of countries
	dropdown = document.createElement("select");
	dropdown.setAttribute("id", "country-dropdown");
	for (element in countriesList) {
		addOption(dropdown, countriesList[element].name, countriesList[element].value);
	}
	TSW_DeployItems.dropdown = dropdown;

	// Create deployment button
	deployButton = document.createElement("input");
	deployButton.setAttribute("id", "deploy-button");
	deployButton.type = "button";
	deployButton.value = "deploy";
	deployButton.addEventListener("click", function() { DeployButtonClick(); }, false);
	TSW_DeployItems.deployButton = deployButton;

	// Create Refresh Button
	refreshButton = document.createElement("input");
	refreshButton.setAttribute("id", "refresh-button");
	refreshButton.type = "button";
	refreshButton.value = "refresh";
	refreshButton.addEventListener("click", function() { RefreshButtonClick(); }, false);
	TSW_DeployItems.refreshButton = refreshButton;

	// Create Checkbox
	deployAllCheck = document.createElement("input");
	deployAllCheck.setAttribute("id", "deploy-all-check");
	deployAllCheck.type = "checkbox";
	deployAllCheck.value = "deployAll";
	deployAllCheck.setAttribute("alt", "Deploy All Agents");
	deployAllCheck.checked = true;
	deployAllCheck.addEventListener("click", function() { TSW_DeployItems.DeployAll = this.checked; if (TSW_DeployItems.quantFrame.style.visibility == "hidden") { TSW_DeployItems.quantFrame.style.visibility = "visible"; } else { TSW_DeployItems.quantFrame.style.visibility = "hidden"; } }, false);
	TSW_DeployItems.checkBox = deployAllCheck;
	TSW_DeployItems.DeployAll = true;

	// Create quantity frame, manually determined the location, unsure of how to do automatically.
	quantityFrame = document.createElement("div");
	quantityFrame.setAttribute("id", "deploy-quantity-area");
	document.getElementsByTagName("body")[0].appendChild(quantityFrame);
	quantityFrame.style.borderLeft = "4px solid #0101DF";
	quantityFrame.style.borderRight = "4px solid #0101DF";
	quantityFrame.style.borderBottom = "4px solid #0101DF";
	quantityFrame.style.background = "#00BFFF";
	quantityFrame.style.position = "absolute";
	quantityFrame.style.left = "10px";
	quantityFrame.style.top = "58px";
	quantityFrame.style.padding = "10px";
	quantityFrame.style.visibility = "hidden";
	quantityFrame.innerHTML = "Agents to Deploy: ";
	TSW_DeployItems.quantFrame = quantityFrame;

	// Create input box for quantity of agents to send out
	deployQuantity = document.createElement("input");
	deployQuantity.setAttribute("id", "deploy-quantity");
	deployQuantity.setAttribute("size", "1");
	deployQuantity.value = depNum;
	TSW_DeployItems.deployQuantity = deployQuantity;
	quantityFrame.appendChild(TSW_DeployItems.deployQuantity);

	// Store visibility state of quantityFrame
	TSW_DeployItems.quantityStatus = TSW_DeployItems.quantFrame.style.visibility;
	
	// Store reference to old track_event function
	var oldFunc = unsafeWindow.AYZ_Tracking.track_event
	// New function is old function plus activation of button if the welcome back page is being displayed (logged in)
	unsafeWindow.AYZ_Tracking.track_event = function(category, action, label) { oldFunc(category, action, label); if (action == "welcomeBackPage") { activate_button(); }; }
}

// returns number of agents being deployed.  If a non numeric was entered deploy 1 cycles worth and set the value to that ammount
function getQuantity() {
	nDeploy = Number(TSW_DeployItems.deployQuantity.value);
	if (isNaN(nDeploy)) {
		TSW_DeployItems.deployQuantity.value = depNum;
		nDeploy = depNum;
	}
	return nDeploy;
}

// Updates text in div section with number of agents, the dropdown and the buttons.
function agent_update(data) {
	agents = grep_agent_ids(data);
	TSW_DeployItems.mainFrame.innerHTML = agents.length +  ' agents deployable ';
	TSW_DeployItems.mainFrame.appendChild(TSW_DeployItems.checkBox);
	TSW_DeployItems.mainFrame.appendChild(TSW_DeployItems.dropdown);
	TSW_DeployItems.mainFrame.appendChild(TSW_DeployItems.deployButton);
	TSW_DeployItems.mainFrame.appendChild(TSW_DeployItems.refreshButton);
	TSW_DeployItems.quantFrame.style.visibility = TSW_DeployItems.quantityStatus;
}

// Sends AMF request for number of agents and then updates the div with this information via callback
function activate_button() {
	requestAMF(get_deployable_agents_amf, agent_update);
}

// Clicking the deploy button determines how many agents to send out and begins the process
function DeployButtonClick(event) {
	TSW_DeployItems.counter = TSW_DeployItems.DeployAll ? agents.length : Math.min(getQuantity(), agents.length);
	TSW_DeployItems.quantityStatus = TSW_DeployItems.quantFrame.style.visibility;
	ProcessDeploy();
}

// generates an AMF request to send the agents out
function ProcessDeploy() {
	requestAMF(get_deployable_agents_amf, function(data) {
		var countryDD = TSW_DeployItems.dropdown;
		// Get a list of deployable agents from the game; if there are none, stop deploying
		agents = grep_agent_ids(data);
		if(agents.length <= 0 || TSW_DeployItems.counter <= 0) {
			activate_button();
			return;
		}
		// Update button div with status
		var deployCycle = Math.min(Math.min(TSW_DeployItems.counter, depNum), agents.length);
		TSW_DeployItems.mainFrame.innerHTML = 'Deploying ' + TSW_DeployItems.counter +  ' agent' + (TSW_DeployItems.counter == 1 ? '' : 's') + ' to ' + countryDD.options[countryDD.selectedIndex].text + ' ...';
		TSW_DeployItems.quantFrame.style.visibility = "hidden";
		// Deploy the first depNum agents in the array to the selected location
		amf = deploy_agents_amf(agents.slice(0, deployCycle), countryDD.options[countryDD.selectedIndex].value);
		TSW_DeployItems.counter -= deployCycle;
		requestAMF(amf, ProcessDeploy);
	});
}

// Refresh the number of agents.
function RefreshButtonClick(event) {
	TSW_DeployItems.quantityStatus = TSW_DeployItems.quantFrame.style.visibility;
	TSW_DeployItems.mainFrame.innerHTML = "Updating...";
	TSW_DeployItems.quantFrame.style.visibility = "hidden";
	activate_button();
}

init_elements();
GM_registerMenuCommand("Activate Deployer", activate_button);