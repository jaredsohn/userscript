// ==UserScript==
// @name           TSW Agent Deploy
// @namespace      bb
// @description    Automatic agent deployment for The Secret War
// @include        http://secretwar.thesecretworld.com/
// @version        1.3
// ==/UserScript==

// URL to the Secret War AMF gateway
var url = "http://secretwar.thesecretworld.com/amf_gateway";
// Pre-encoded request for a list of deployable agents
var get_deployable_agents_amf = '\x00\x00\x00\x00\x00\x01\x00!application.get_deployable_agents\x00\x02/1\x00\x00\x00\x00\n\x00\x00\x00\x00';
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
// Install the button
function install_button() {
    button = document.getElementById("deploy-all-button");
    if(!button) {
        button = document.createElement("div");
        button.setAttribute("id", "deploy-all-button");
        document.getElementsByTagName("body")[0].appendChild(button);
    }
    button.style.border = "4px solid #090";
    button.style.background = "#6f6";
    button.style.position = "absolute";
    button.style.left = "10px";
    button.style.top = "10px";
    button.style.padding = "10px";
	button.innerHTML = '<input type="button" value="update" onclick="update_agents()" />';
}
// Update the agents
function update_agents() {
	// Once the button element is there, update it with the number of deployable agents and add the actual deploy button
    button.innerHTML = "Updating...";
	
    requestAMF(get_deployable_agents_amf, function(data) {
        agents = grep_agent_ids(data);
		// Kudos to Perkus for adding many country codes based upon this source:
		// https://docs.google.com/spreadsheet/ccc?key=0AlPdF8psQfHgdHY2ZTJZUkhvTExOUEpxN1YwRW05anc#gid=0
		countrySelect = '<select id="agent_country"> \
		<optgroup label="Africa"> \
		<option value="60">Algeria</option> \
		<option value="63">Angola</option> \
		<option value="82">Benin</option> \
		<option value="87">Botswana</option> \
		<option value="94">Burkina Faso</option> \
		<option value="96">Burundi</option> \
		<option value="98">Cameroon</option> \
		<option value="100">Cape Verde</option> \
		<option value="102">Central African Republic</option> \
		<option value="103">Chad</option> \
		<option value="3">Côte d\'Ivoire</option> \
		<option value="111">Democratic Republic of the Congo</option> \
		<option value="123">Djibouti</option> \
		<option value="112">Republic of the Congo</option> \
		<option value="127">Egypt</option> \
		<option value="130">Eritrea</option> \
		<option value="132">Ethiopia</option> \
		<option value="141">Gabon</option> \
		<option value="142">The Gambia</option> \
		<option value="146">Ghana</option> \
		<option value="154">Guinea</option> \
		<option value="155">Guinea-Bissau</option> \
		<option value="129">Equatorial Guinea</option> \
		<option value="179">Kenya</option> \
		<option value="189">Lesotho</option> \
		<option value="190">Liberia</option> \
		<option value="191">Libya</option> \
		<option value="197">Madagascar</option> \
		<option value="198">Malawi</option> \
		<option value="201">Mali</option> \
		<option value="204">Mauritania</option> \
		<option value="205">Mauritius</option> \
		<option value="213">Morocco</option> \
		<option value="214">Mozambique</option> \
		<option value="215">Namibia</option> \
		<option value="223">Niger</option> \
		<option value="224">Nigeria</option> \
		<option value="319">La Reunion</option> \
		<option value="246">Rwanda</option> \
		<option value="256">Sao Tome and Principe</option> \
		<option value="258">Senegal</option> \
		<option value="261">Sierra-Leone</option> \
		<option value="267">Somalia</option> \
		<option value="268">South Africa</option> \
		<option value="275">Sudan</option> \
		<option value="278">Swaziland</option> \
		<option value="284">Tanzania</option> \
		<option value="287">Togo</option> \
		<option value="291">Tunisia</option> \
		<option value="296">Uganda</option> \
		<option value="310">Western Sahara</option> \
		<option value="312">Zambia</option> \
		<option value="313">Zimbabwe</option> \
		</optgroup> \
		\
		<optgroup label="Asia"> \
		<option value="57">Afghanistan</option> \
		<option value="68">Armenia</option> \
		<option value="74">Azerbaijan</option> \
		<option value="77">Bangladesh</option> \
		<option value="84">Bhutan</option> \
		<option value="95">Burma</option> \
		<option value="97">Cambodia</option> \
		<option value="105">China</option> \
		<option value="144">Georgia</option> \
		<option value="164">India</option> \
		<option value="175">Japan</option> \
		<option value="178">Kazakhstan</option> \
		<option value="185">Kyrgyzstan</option> \
		<option value="186">Laos</option> \
		<option value="210">Mongolia</option> \
		<option value="218">Nepal</option> \
		<option value="231">Pakistan</option> \
		<option value="234">Papua New Guinea</option> \
		<option value="245">Russia</option> \
		<option value="262">Singapore</option> \
		<option value="274">Sri Lanka</option> \
		<option value="278">Swaziland</option> \
		<option value="282">Taiwain</option> \
		<option value="283">Tajikistan</option> \
		<option value="285">Thailand</option> \
		<option value="293">Turkmenistan</option> \
		<option value="302">Uzbekistan</option> \
		<option value="305">Vietnam</option> \
		</optgroup> \
		\
		<optgroup label="Asia / Oceania"> \
		<option value="92">Brunei</option> \
		<option value="166">Indonesia</option> \
		<option value="199">Malaysia</option> \
		<option value="238">Philippines</option> \
		<option value="286">Timor-Leste</option> \
		</optgroup> \
		\
		<optgroup label="Oceania"> \
		<option value="72">Australia</option> \
		<option value="136">Fiji</option> \
		<option value="216">Nauru</option> \
		<option value="220">New Caledonia</option> \
		<option value="221">New Zealand</option> \
		<option value="232">Palau</option> \
		<option value="254">Samoa</option> \
		<option value="266">Solomon Islands</option> \
		<option value="289">Tonga</option> \
		<option value="303">Vanuatu</option> \
		</optgroup> \
		\
		<optgroup label="Europe"> \
		<option value="59">Albania</option> \
		<option value="62">Andorra</option> \
		<option value="73">Austria</option> \
		<option value="79">Belarus</option> \
		<option value="80">Belgium</option> \
		<option value="86">Bosnia and Herzegovina</option> \
		<option value="93">Bulgaria</option> \
		<option value="116">Croatia</option> \
		<option value="119">Cyprus</option> \
		<option value="120">Czech Republic</option> \
		<option value="121">Denmark</option> \
		<option value="131">Estonia</option> \
		<option value="134">Falkland Islands</option> \
		<option value="137">Finland</option> \
		<option value="138">France</option> \
		<option value="145">Germany</option> \
		<option value="144">Georgia</option> \
		<option value="148">Greece</option> \
		<option value="149">Greenland</option> \
		<option value="159">Holy City (Vatican City)</option> \
		<option value="162">Hungary</option> \
		<option value="163">Iceland</option> \
		<option value="169">Ireland</option> \
		<option value="172">Italy</option> \
		<option value="183">Kosovo</option> \
		<option value="187">Latvia</option> \
		<option value="192">Liechtenstein</option> \
		<option value="193">Lithuania</option> \
		<option value="194">Luxembourg</option> \
		<option value="196">Macedonia</option> \
		<option value="202">Malta</option> \
		<option value="208">Moldova</option> \
		<option value="211">Montenegro</option> \
		<option value="219">Netherlands</option> \
		<option value="228">Norway</option> \
		<option value="240">Poland</option> \
		<option value="241">Portugal</option> \
		<option value="244">Romania</option> \
		<option value="255">San Marino</option> \
		<option value="259">Serbia</option> \
		<option value="264">Slovakia</option> \
		<option value="265">Slovenia</option> \
		<option value="272">Spain</option> \
		<option value="277">Svalbard</option> \
		<option value="279">Sweden</option> \
		<option value="280">Switzerland</option> \
		<option value="292">Turkey</option> \
		<option value="297">Ukraine</option> \
		<option value="299">United Kingdom</option> \
		</optgroup> \
		\
		<optgroup label="Middle East"> \
		<option value="76">Bahrain</option> \
		<option value="167">Iran</option> \
		<option value="168">Iraq</option> \
		<option value="171">Israel</option> \
		<option value="184">Jordan</option> \
		<option value="184">Kuwait</option> \
		<option value="188">Lebanon</option> \
		<option value="229">Oman</option> \
		<option value="243">Quatar</option> \
		<option value="257">Saudi Arabia</option> \
		<option value="281">Syria</option> \
		<option value="198">United Arab Emirates</option> \
		<option value="311">Yemen</option> \
		</optgroup> \
		\
		<optgroup label="North America"> \
		<option value="99">Canada</option> \
		<option value="206">Mexico</option> \
		</optgroup> \
		\
		<optgroup label="United States"> \
		<option value="1">Alabama</option> \
		<option value="2">Alaska</option> \
		<option value="61">American Samoa</option> \
		<option value="4">Arizona</option> \
		<option value="5">Arkansas</option> \
		<option value="6">California</option> \
		<option value="7">Colorado</option> \
		<option value="8">Connecticut</option> \
		<option value="9">Delaware</option> \
		<option value="10">District of Columbia</option> \
		<option value="11">Florida</option> \
		<option value="12">Georgia</option> \
		<option value="14">Hawaii</option> \
		<option value="15">Idaho</option> \
		<option value="16">Illinois</option> \
		<option value="17">Indiana</option> \
		<option value="18">Iowa</option> \
		<option value="19">Kansas</option> \
		<option value="20">Kentucky</option> \
		<option value="21">Louisiana</option> \
		<option value="22">Maine</option> \
		<option value="23">Maryland</option> \
		<option value="24">Massachusetts</option> \
		<option value="25">Michigan</option> \
		<option value="26">Minnesota</option> \
		<option value="27">Mississippi</option> \
		<option value="28">Missouri</option> \
		<option value="29">Montana</option> \
		<option value="30">Nebraska</option> \
		<option value="31">Nevada</option> \
		<option value="32">New Hampshire</option> \
		<option value="33">New Jersey</option> \
		<option value="34">New Mexico</option> \
		<option value="35">New York</option> \
		<option value="36">North Carolina</option> \
		<option value="37">North Dakota</option> \
		<option value="39">Ohio</option> \
		<option value="40">Oklahoma</option> \
		<option value="41">Oregon</option> \
		<option value="42">Pennsylvania</option> \
		<option value="44">Rhode Island</option> \
		<option value="45">South Carolina</option> \
		<option value="46">South Dakota</option> \
		<option value="47">Tennessee</option> \
		<option value="48">Texas</option> \
		<option value="49">Utah</option> \
		<option value="50">Vermont</option> \
		<option value="51">Virginia</option> \
		<option value="52">Virgin Islands</option> \
		<option value="53">Washington</option> \
		<option value="54">West Virginia</option> \
		<option value="55">Wisconsin</option> \
		<option value="56">Wyoming</option> \
		</optgroup> \
		\
		<optgroup label="Central America / Carribean"> \
		<option value="315">Anguilla</option> \
		<option value="65">Antigua and Barbuda</option> \
		<option value="69">Aruba </option> \
		<option value="75">The Bahamas</option> \
		<option value="78">Barbados</option> \
		<option value="81">Belize</option> \
		<option value="101">Cayman Islands</option> \
		<option value="114">Costa Rica</option> \
		<option value="117">Cuba</option> \
		<option value="124">Dominican Republic</option> \
		<option value="128">El Salvador</option> \
		<option value="150">Grenada</option> \
		<option value="316">Guadeloupe</option> \
		<option value="152">Guatemala</option> \
		<option value="157">Haiti</option> \
		<option value="160">Honduras</option> \
		<option value="173">Jamaica</option> \
		<option value="317">Martinique</option> \
		<option value="212">Montserrat</option> \
		<option value="314">Netherlands-Antilles</option> \
		<option value="222">Nicaragua</option> \
		<option value="233">Panama</option> \
		<option value="242">Puerto Rico</option> \
		<option value="249">Saint Kitts and Nevis</option> \
		<option value="250">Saint Lucia</option> \
		<option value="251">Saint Martin</option> \
		<option value="290">Trinidad & Tobago</option> \
		<option value="52">US Virgin Islands</option> \
		</optgroup> \
		\
		<optgroup label="South America"> \
		<option value="67">Argentinia</option> \
		<option value="85">Bolivia</option> \
		<option value="89">Brazil</option> \
		<option value="104">Chile</option> \
		<option value="109">Columbia</option> \
		<option value="126">Ecuador</option> \
		<option value="139">French Guiana</option> \
		<option value="156">Guyana</option> \
		<option value="236">Paraguay</option> \
		<option value="237">Peru</option> \
		<option value="301">Uruguay</option> \
		<option value="304">Venezuela</option> \
		</optgroup> \
		</select> ';
        button.innerHTML = countrySelect + agents.length +  ' agents deployable <input type="button" value="deploy" onclick="prepare_deploy()"/>';
    });
}
function prepare_deploy() {
	targetCountry = document.getElementById("agent_country").value;
	if (targetCountry != '')
	{
		deploy_them();
	}
	else
	{
		button.innerHTML = 'Not yet included country selected, try again. <input type="button" value="update" onclick="update_agents()" />';
	}
}
// Deploy the agents
function deploy_them() {
    requestAMF(get_deployable_agents_amf, function(data) {
        // Get a list of deployable agents from the game; if there are none, stop deploying
        agents = grep_agent_ids(data);
        if(agents.length <= 0) {
            install_button();
            return;
        }
        // Update button div with status
        button.innerHTML = agents.length +  ' agents deploying to ' + targetCountry;
        // Deploy the first 10 agents in the array
        amf = deploy_agents_amf(agents.slice(0, 12), targetCountry);
        requestAMF(amf, function(data) {
            deploy_them();
        });
    });
}
unsafeWindow.update_agents = update_agents;
unsafeWindow.prepare_deploy = prepare_deploy;
unsafeWindow.deploy_them = deploy_them;
// Finally...
install_button();