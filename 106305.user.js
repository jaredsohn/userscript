// ==UserScript== 

// @name           cobotAutoRec
// @namespace      http://cobothealth.org 
// @description    Cobot Health and Education Recommendation on Openstudy
// @include        http://openstudy.com/groups/mathematics 
// @include        http://openstudy.com/groups/biology 
// @include        http://openstudy.com/groups/mathematics 
// @include        http://openstudy.com/groups/computer%20science
// @include        http://openstudy.com/groups/computer+science 
// @include        http://openstudy.com/groups/chemistry 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.cc.gatech.edu/~ssahay/jquery/jquery-ui-1.8.14.custom.min.js	
// @require        http://www.cc.gatech.edu/~ssahay/jquery/jquery.ui.stars.js	
// @require        http://www.cc.gatech.edu/~ssahay/jquery/strophe.min.js
// @require        http://www.cc.gatech.edu/~ssahay/jquery/jquery.toastmessage.js

// ==/UserScript== 
//author Saurav Sahay
//www.cc.gatech.edu/~ssahay




(function() {
})();

$(document)
.ready(

		function() {

			addStyleSheet('@import "http://www.cc.gatech.edu/~ssahay/jquery/jquery.ui.stars.css";');
			addStyleSheet('@import "http://www.cc.gatech.edu/~ssahay/jquery/jquery.toastmessage.css";');
			$().toastmessage({sticky : true});
			var group = $(".group-name").text();
			var convId;
			var b1 = new Boolean(0);
			var t; // timeout for replies check
			var tryFetch; // for auto get Reco from cobot
			// live on new conversation
			var id;
			var dataId;
			var question; // global variable to avoid repeated clicks msgs on LHS post

			//msging infras
			var BOSH_SERVICE = 'http://cobot.dyndns-ip.com/http-bind';
			var connection = null;
			var connectUser = $(".username", $("#top-links")).text();
			console.log('Logged in user type: ' +  typeof connectUser);
			console.log('Logged in user: ' +  connectUser);
			if(connectUser == false)
				{	
					console.log('user is not logged in!');
					$(".group").after("<div id=cobotTopMessage> Please login and restart openstudy.com to see cobot recommendations.</div>");
					return;
				}
	

			if(connectUser) {

				verifyOrRegisterUser(connectUser, group); // try to connect user		

			}

			$(".content-container").click(function(){
			if (typeof t != 'undefined') {
						window.clearInterval(t);
						$(".reply").die('myEvent');
					}
			}); 


			// user clicks on a LHS conversation

			$(".update")

			.live('click', function() {

				if(connectUser == false)
				{
					console.log('user is not logged in!');
					//notify user
					$("#NotLoggedInCobot").remove();
					$("#cobotTopMessage").remove();

					$(this).after("<div id=NotLoggedInCobot> Please login to see Cobot recommendations.</div>");
					return;				

				}
	

				if ($(this).attr('data-category') === "update_feed_item") { // console.log(typeof

					// $(this));

					
					console

					.log("Id of this element clicked: "

							+ $(this).attr('data-id'));

					if ((typeof dataId == 'undefined')

							|| (dataId != $(this).attr('data-id')))

					{
					  if (typeof t != 'undefined') {
						window.clearInterval(t);
						$(".reply").die('myEvent');
					}

					  dataId = $(this).attr('data-id');						
					  getPutRecos();
 
					}
				}

			});

			function getPutRecos() {
				console.log('Group: ' + group);

				$('.update-body').live("getReco", function(e)
					{
					console.log($(".body", '.update-body').text());
					//if this event is called ... stop further triggers
					window.clearInterval(tryFetch);
					$('.update-body').die("getReco");
					var block = $(this);
					if (question == $(".body", block).text())
					{
						console.log('reco already showing!');
						return;

					}
					$('#current-update').prepend('<div id=cobotSurvey><a href="http://www.surveymonkey.com/s/PZ7TTF8"  TARGET=_BLANK>Cobot Recommendation survey</a></div>');
						$("a",'#cobotSurvey').click(function(event) {

						event.stopImmediatePropagation();
						//var type = "doc";
						//console.log('click handler for reco doc called!');
						sendSurveyClickMessage();

					});

					var username = $(".username", block)

					.text();

					var buttonblock = $(this);
					var image = '<img id="loader" src="http://www.prism.gatech.edu/~gtg655v/waiting_icon2.gif"/>';
					var fetchQuestionWait = '<div id=fetchQuestionWait>Analyzing question and fetching recommendations</div>';
					buttonblock.before('<div id=cobotMessages></div>');
					$('#cobotMessages').append(image);
					$('#cobotMessages').append(fetchQuestionWait);
										

					console.log('User: ' + username);
					console.log('Data ID: ' + dataId);
					question = $(".body", block).text();
					var time = $('.last-updated', block).attr('data-date');
					console.log('Question: ' + question);
					console.log('Time of question: ' + time);
					var result = createConv(username,question,time, group, dataId);
					var xmlString = (new XMLSerializer()).serializeToString(result);
					GM_xmlhttpRequest( { 
						method : "POST", 
						url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",
						data : xmlString,
						onerror : function(response) {
						//alert("Error");
						console.log('Server error!');
						$('#cobotMessages').remove();
						var buttonblock = $('.update-body');
						var cobotErrorMsg = 'cobot server is not responding! Let them know!';
						buttonblock.before('<div id=cobotMessages></div>');
						$('#cobotMessages').append(cobotErrorMsg);
						return;					
					},

					onload : function(response) {
						if (!response.responseXML) {
							response.responseXML = new DOMParser()
							.parseFromString(
									response.responseText,
							"text/xml");
						}
						var xmlResponse = (new
								XMLSerializer())
								.serializeToString(response.responseXML);
						console.log(response.status);
						var xml = response.responseXML;
						console.log(xmlResponse);

						var ok = $(xml).find("message").text();
						console.log(ok);
						if(ok=="OK") {
						$('#cobotMessages').remove();
						var response = new Boolean(0);
						convId = loadPopup(xml, block,response);
						console.log('Conversation Id: ' + convId);
						setupRepliesHandler(convId);
						}
						else {
						$('#cobotMessages').remove();
						var buttonblock = $('.update-body');
						var cobotErrorMsg = 'Some error! See error console for details. Report this error please!';
						buttonblock.before('<div id=cobotMessages></div>');
						$('#cobotMessages').append(cobotErrorMsg);
						console.log("Method failed at backend!");								
						}
					}

					});

						});
				//trigger then die
				triggerAutoRecEveryNSeconds();

			}

			function triggerAutoRecEveryNSeconds() {

				tryFetch = window.setInterval(function() {

					$(".update-body").trigger('getReco');

				}, 2000);

			}	

			function setupRepliesHandler(cId) {

				var replies = [];

				$(".reply")

				.live('myEvent', function() {

					if ($.inArray($(this).attr('data-id'),

							replies) > -1) {

						console

						.log($(this)

								.attr('data-id')

								+ " - it's in there already!");

					}

					else {

						console.log("Data-id for this reply: " + $(this).attr('data-id'));
						replies.push($(this)

								.attr('data-id'));

						// get recos

						var block = $(this);

						var username = $(".username",

								block).text();// remove

						console

						.log('Responding User: ' + username);

						var response = $(".body", block)

						.text();

						if (response) {

							var time = $('.last-updated', block).attr('data-date');

							console

							.log('Response: ' + response);

							console

							.log('Time of question: ' + time);

							var result = createResponse(username, response,time, cId);
							var xmlString = (new XMLSerializer())
							.serializeToString(result);
							console.log(xmlString);

							$('#cobotMessages').remove();
							var buttonblock = $('.update-body');
							var image = '<img id="loader" src="http://www.prism.gatech.edu/~gtg655v/waiting_icon2.gif"/>';
							var fetchResponseWait = 'Analyzing reply and fetching new recommendations';
							buttonblock.before('<div id=cobotMessages></div>');
							$('#cobotMessages').append(image);
							$('#cobotMessages').append(fetchResponseWait);
					

							GM_xmlhttpRequest( {

								method : "POST",

								url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

								data : xmlString,

								onerror : function(response) {

								//alert("Error");
								console.log('Server error!');
								$('#cobotMessages').remove();
								var buttonblock = $('.update-body');
								var cobotErrorMsg = 'cobot server is not responding! Let them know!';
								buttonblock.before('<div id=cobotMessages></div>');
								$('#cobotMessages').append(cobotErrorMsg);
								return;					


							},

							onload : function(response) {
								if (!response.responseXML) {
									response.responseXML = new DOMParser()
									.parseFromString(
											response.responseText,
									"text/xml");
								}
								var xmlResponse = (new
								XMLSerializer())
								.serializeToString(response.responseXML);
								var xml = response.responseXML;
								console.log(xmlResponse);

						var ok = $(xml).find("message").text();
						console.log(ok);
						if(ok=="OK") {
						$('#cobotMessages').remove();
						var response = new Boolean(1);
						loadPopup(xml, block,response);	
						}
						else {
						$('#cobotMessages').remove();
						var buttonblock = $('.update-body');
						var cobotErrorMsg = 'Some error fetching! See error console for details. Report this error please!';
						buttonblock.before('<div id=cobotMessages></div>');
						$('#cobotMessages').append(cobotErrorMsg);
						console.log("Method failed at backend!");								
						}
							}
							});
						}

					} 

				});

				triggerReplyHandlerEveryNSeconds();

			}

			function triggerReplyHandlerEveryNSeconds() {

				t = window.setInterval(function() {

					b1 = false;

					$(".reply").trigger('myEvent');

				}, 7000);

			}
			
			

			

			function ratingWidget(id) {

				var ratingForm = '<form id="ratings'

					+ id

					+ '" action="" method="post">  \n'

					+ '<select name="rate"> \n'

					+ '<option value="1">Very poor</option> \n'

					+ '<option value="2">Not that bad</option> \n'

					+ '<option value="3" selected="selected">Average</option> \n'

					+ '<option value="4">Good</option> \n'

					+ '<option value="5">Perfect</option> \n'

					+ '</select> \n'

					+ '<input type="submit" value="Rate it!" /> \n'

					+ '</form> \n' + '<p id="ajax_response"></p>';

				return ratingForm;

			}

			function sendSurveyClickMessage() {
				var connectUser = $(".username", $("#top-links")).text();	
				if(connectUser == false) {
					console.log("connectedUser is false!");					
					return;		
				}
				var msg = createSurveyClickMessage(connectUser);
				var createSurveyXmlString = (new XMLSerializer()).serializeToString(msg);
				GM_xmlhttpRequest( {
					method : "POST",
					url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",
					data : createSurveyXmlString,
					onerror : function(response) {
					console.log("Is the backend server running?");
				},
				onload : function(response) {
					if (!response.responseXML) {
						response.responseXML = new DOMParser()
						.parseFromString(
								response.responseText,
								"text/xml");
					}
					var xml = response.responseXML;
					var ok = $(xml).find("message").text();
					console.log(ok);
					if(ok=="OK") {
						console.log("Method succeeded at backend!");
					}
					else {
						console.log("Method failed at backend! :(");								
					}
				}
				});
			}
			
			function sendRecoClickMessage(cid, id, type) {
				var connectUser = $(".username", $("#top-links")).text();
				if(connectUser == false) {

					console.log("connectedUser is false!");					
					return;		

				}
			
				console.log("Clicked Entity id: " + id);
				console.log("Conversation id: " + cid);
				var verMessage;
				if(type=="user")

				 	{verMessage = createRecoUserClickMessage(connectUser, id, cid);}
				else if(type=="doc")
				 	{verMessage = createRecoDocClickMessage(connectUser, id, cid);}
				else if(type=="conv")
				 	{verMessage = createRecoConvClickMessage(connectUser, id, cid);}
				var createClickedXmlString = (new XMLSerializer()).serializeToString(verMessage);

				console.log(createClickedXmlString);

				GM_xmlhttpRequest( {

					method : "POST",

					url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

					data : createClickedXmlString,

					onerror : function(response) {

					console.log("Is the backend server running?");

				},

				onload : function(response) {

					if (!response.responseXML) {

						response.responseXML = new DOMParser()

						.parseFromString(

								response.responseText,

								"text/xml");

					}

					var xml = response.responseXML;

					var ok = $(xml).find("message").text();

					console.log(ok);

					if(ok=="OK") {

						console.log("Method succeeded at backend!");

					}

					else {

						console.log("Method failed at backend!");								

					}

				}

				});

			}

			function sendClicedkMessage(uid, cid) {
				console.log("User id: " + uid);
				console.log("Conversation id: " + cid);
				

				var verMessage = createInverseClickMessage(uid, cid);

				var createClickedXmlString = (new XMLSerializer()).serializeToString(verMessage);

				console.log(createClickedXmlString);

				GM_xmlhttpRequest( {

					method : "POST",

					url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

					data : createClickedXmlString,

					onerror : function(response) {

					console.log("Is the backend server running?");

				},

				onload : function(response) {

					if (!response.responseXML) {

						response.responseXML = new DOMParser()

						.parseFromString(

								response.responseText,

								"text/xml");

					}

					var xml = response.responseXML;

					var ok = $(xml).find("message").text();

					console.log(ok);

					if(ok=="OK") {

						console.log("Method succeeded at backend!");

					}

					else {

						console.log("Method failed at backend!");								

					}

				}

				});
 			}

	

			function verifyOrRegisterUser(user, group) {



				var verMessage = createUser(user, group);

				var createUserxmlString = (new XMLSerializer()).serializeToString(verMessage);

				console.log(createUserxmlString);

				GM_xmlhttpRequest( {

					method : "POST",

					url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

					data : createUserxmlString,

					onerror : function(response) {
					//alert("Error");
					console.log('Server error!');
					$('#cobotMessages').remove();
					var buttonblock = $('.update-body');
					var cobotErrorMsg = 'cobot server is not responding! Let them know!';
					buttonblock.before('<div id=cobotMessages></div>');
					$('#cobotMessages').append(cobotErrorMsg);
					return;					

				},

				onload : function(response) {

					if (!response.responseXML) {

						response.responseXML = new DOMParser()

						.parseFromString(

								response.responseText,

								"text/xml");

					}

					var xml = response.responseXML;

					var ok = $(xml).find("message").text();

					console.log(ok);

					if(ok=="OK") {
						
						//connect the user

						var jUser = user.replace(/\W+/g,"_");

						connect(jUser);

					}

					else {

						console.log("Method failed at backend!");								

					}

				}

				});



			}

			function createSurveyClickMessage(connectedUser) {
				var text = "<incomingMessage>";

				text = text + "<message ID=\"106\"></message>"; 

				text = text + "<userId>" + connectedUser + "</userId>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;
			}

			function createRecoUserClickMessage(connectedUser, ruid, cid) {
				var text = "<incomingMessage>";

				text = text + "<message ID=\"103\"></message>"; 

				text = text + "<userId>" + connectedUser + "</userId>";

				text = text + "<convId>" + cid + "</convId>";
				text = text + "<ruid>" + ruid + "</ruid>";
				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;
			}
			
			function createRecoDocClickMessage(connectedUser, rdid, cid) {
				var text = "<incomingMessage>";

				text = text + "<message ID=\"104\"></message>"; 

				text = text + "<userId>" + connectedUser + "</userId>";

				text = text + "<convId>" + cid + "</convId>";
				text = text + "<rdid>" + rdid + "</rdid>";
				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;
			}

			function createRecoConvClickMessage(connectedUser, rcid, cid) {
				var text = "<incomingMessage>";

				text = text + "<message ID=\"105\"></message>"; 

				text = text + "<userId>" + connectedUser + "</userId>";

				text = text + "<convId>" + cid + "</convId>";
				text = text + "<rcid>" + rcid + "</rcid>";
				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;
			}



			function createInverseClickMessage(uid, cid) {
				var text = "<incomingMessage>";

				text = text + "<message ID=\"102\"></message>"; 

				text = text + "<userId>" + uid + "</userId>";

				text = text + "<convId>" + cid + "</convId>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;
			}			


			function createUser(user, group) {

				var text = "<incomingMessage>";

				text = text + "<message ID=\"13\"></message>"; // "<content>whatever</content>";

				text = text + "<userId>" + encodeXml(user)

				+ "</userId>"; // "</note>";

				text = text + "<forum>" + group + "</forum>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;

			}	



			function createConv(name, question, time, group, dataId) {

				var text = "<incomingMessage>";

				text = text + "<message ID=\"100\"></message>"; // "<content>whatever</content>";

				text = text + "<userId>" + encodeXml(name)

				+ "</userId>"; // "</note>";

				text = text + "<dataId>" + dataId + "</dataId>";

				text = text + "<forum>" + group + "</forum>";

				text = text + "<title></title>";

				text = text + "<convSnippet>" + encodeXml(question)

				+ "</convSnippet>";

				text = text + "<time>" + time + "</time>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;

			}

			function createResponse(name, response, time, convId) {

				var text = "<incomingMessage>";

				text = text + "<message ID=\"101\"></message>"; // "<content>whatever</content>";

				text = text + "<userId>" + encodeXml(name)

				+ "</userId>"; // "</note>";

				text = text + "<convId>" + convId + "</convId>";

				text = text + "<title></title>";

				text = text + "<convSnippet>" + encodeXml(response)

				+ "</convSnippet>";

				text = text + "<time>" + time + "</time>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;

			}

			function createUserRatingXML(loggedInUser, rid, cid, value) {

				var text = "<incomingMessage>";

				text = text + "<message ID=\"9\"></message>"; // "<content>whatever</content>";

				text = text + "<userId>" + encodeXml(loggedInUser)

				+ "</userId>"; // "</note>";

				text = text + "<conversationId>" + cid

				+ "</conversationId>";

				text = text + "<ratedUserId>" + rid + "</ratedUserId>";

				text = text + "<thumbsUpValue>" + value

				+ "</thumbsUpValue>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;

			}

			function createConvRatingXML(loggedInUser, rid, cid, value) {

				var text = "<incomingMessage>";

				text = text + "<message ID=\"17\"></message>"; // "<content>whatever</content>";

				text = text + "<userId>" + encodeXml(loggedInUser)

				+ "</userId>"; // "</note>";

				text = text + "<conversationId>" + cid

				+ "</conversationId>";

				text = text + "<ratedConvId>" + rid + "</ratedConvId>";

				text = text + "<thumbsUpValue>" + value

				+ "</thumbsUpValue>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;

			}

			function createWebpageRatingXML(loggedInUser, rid, cid,

					value) {

				var text = "<incomingMessage>";

				text = text + "<message ID=\"10\"></message>"; // "<content>whatever</content>";

				text = text + "<userId>" + encodeXml(loggedInUser)

				+ "</userId>"; // "</note>";

				text = text + "<conversationId>" + cid

				+ "</conversationId>";

				text = text + "<ratedPageId>" + rid + "</ratedPageId>";

				text = text + "<thumbsUpValue>" + value

				+ "</thumbsUpValue>";

				text = text + "</incomingMessage>";

				var doc = StringtoXML(text);

				return doc;

			}

			function StringtoXML(text) {

				if (window.ActiveXObject) {

					var doc = new ActiveXObject('Microsoft.XMLDOM');

					doc.async = 'false';

					doc.loadXML(text);

				} else {

					var parser = new DOMParser();

					var doc = parser.parseFromString(text, 'text/xml');

				}

				return doc;

			}

			function encodeXml(s) {

				return (s.replace(/&/g, '&amp;')

						.replace(/"/g, '&quot;')

						.replace(/'/g, '&apos;').replace(/</g, '&lt;')

						.replace(/>/g, '&gt;').replace(/\t/g, '&#x9;')

						.replace(/\n/g, '&#xA;')

						.replace(/\r/g, '&#xD;'));

			}

			var Url = {

					// public method for url encoding

					encode : function(string) {

				return escape(this._utf8_encode(string));

			},

			// public method for url decoding

			decode : function(string) {

				return this._utf8_decode(unescape(string));

			},

			// private method for UTF-8 encoding

			_utf8_encode : function(string) {

				string = string.replace(/\r\n/g, "\n");

				var utftext = "";

				for ( var n = 0; n < string.length; n++) {

					var c = string.charCodeAt(n);

					if (c < 128) {

						utftext += String.fromCharCode(c);

					} else if ((c > 127) && (c < 2048)) {

						utftext += String

						.fromCharCode((c >> 6) | 192);

						utftext += String

						.fromCharCode((c & 63) | 128);

					} else {

						utftext += String

						.fromCharCode((c >> 12) | 224);

						utftext += String

						.fromCharCode(((c >> 6) & 63) | 128);

						utftext += String

						.fromCharCode((c & 63) | 128);

					}

				}

				return utftext;

			},

			// private method for UTF-8 decoding

			_utf8_decode : function(utftext) {

				var string = "";

				var i = 0;

				var c = c1 = c2 = 0;

				while (i < utftext.length) {

					c = utftext.charCodeAt(i);

					if (c < 128) {

						string += String.fromCharCode(c);

						i++;

					} else if ((c > 191) && (c < 224)) {

						c2 = utftext.charCodeAt(i + 1);

						string += String

						.fromCharCode(((c & 31) << 6)

								| (c2 & 63));

						i += 2;

					} else {

						c2 = utftext.charCodeAt(i + 1);

						c3 = utftext.charCodeAt(i + 2);

						string += String

						.fromCharCode(((c & 15) << 12)

								| ((c2 & 63) << 6) | (c3 & 63));

						i += 3;

					}

				}

				return string;

			}

			}

			// loading popup with jQuery magic!

			function loadPopup(xml, xx, response) {

				if(($(xml).find("recommendedUser").length==0)&&($(xml).find("recommendedConversation").length==0)&&($(xml).find("recommendedDoc").length==0))

				{

					if (response == false) {

						$(id).append('<br>No Recommendations for this question now!');

						$(id).append('</p>');

						$(id).fadeIn("slow");

					}

					var cId = $(xml).find("conversationId").text();

					return cId;

				}				

				var id = '#popupContact';


				var count = 0;

				var b = $('.post-reply').before('<div></div>');

				//.addClass(

				//"update-list");

				var newDiv = b

				.append('<div id="popupContact" class="popupContact">');


				if (response == false) {

					$(id).append('<h1><b>Cobot Recommendations</b></h1> ');

				}


				var cId = $(xml).find("conversationId").text();

				if (response == true)
				{
					var sId = $(xml).find("sentenceId").text();
					console.log('Sentence: ' + sId);
				}

				//console.log('Recommended users: ' + $(xml).find("recommendedUser").length);
				//console.log('Recommended conv: ' + $(xml).find("recommendedConversation").length);
				//console.log('Recommended docs: ' + $(xml).find("recommendedDoc").length);

				if($(xml).find("recommendedConversation").length > 0)

				{

					$(id).append("<br><p><b>Similar Conversations: </b>");			

				}



				$(xml)

				.find("recommendedConversation")

				.each(

						function() {

							count++;

							var dataId = $(this).find("dataId").text();

							var rcid = $(this).find("id").text();

							//$(id).append("<br><p><b>Similar Conversation: </b>");

							//$(id).append($(this).find("body").text());

							var link = '/groups/' + group + '/updates/' + dataId;

							$(id).append('<div id=' + rcid + "><br><p><a href=\"" + link + "\" TARGET=_blank>" + $(this).find("body").text() + "</a></div>");
							var rcidBlock = '#' + rcid;				
							$("a",rcidBlock).click(function(event) {
								if (typeof t != 'undefined') {
									window.clearInterval(t);
									$(".reply").die('myEvent');
								}

								sendRecoClickMessage(cId, rcid, "conv");
								question = "";

							});

							$(id).append(ratingWidget(rcid));

							starifyC(rcid, cId);

						});
				
				
				
				if($(xml).find("recommendedDoc").length > 0)

				{

					$(id).append("<br><p><b>Related Web Resources: </b>");			

				}

				$(xml).find("recommendedDoc").each(function() {

					count++;

					var rdid = $(this).find("id").text();

					//$(id).append('<br><p><b>Web Recommendation: </b>');

					$(id).append('<br><p><b>' + $(this).find("title").text() + '</b>');

					$(id).append("<br>");

					$(id).append($(this).find("description").text());

					// b.append($(this).find("documentUrl").text());

					var url = $(this).find("documentUrl").text();

					$(id).append('<div id=' + rdid + '><a href=\"' + Url.decode(url)

							+ '\" TARGET=_BLANK>' + Url.decode(url)

							+ '</a></div>');

					var rdidBlock = '#' + rdid;					

					$("a",rdidBlock).click(function(event) {

						event.stopImmediatePropagation();
						var type = "doc";
						console.log('click handler for reco doc called!');
						sendRecoClickMessage(cId, rdid, type);

					});



					$(id).append(ratingWidget(rdid));

					starifyW(rdid, cId);

					$(id).append('<p id="ajax_response"></p>');

				});

				if($(xml).find("recommendedUser").length > 0)

				{

					$(id).append("<br><p><b>Related People: </b>");			

				}					

				$(xml)

				.find("recommendedUser")

				.each(

						function() {

							count++;

							var username = $(this).find("id").text();

							var uid = $(this).find("uid").text();

							var user = '/users/' + username;

							$(id).append('<div id=' + uid + "><br><p><a href=\"" + user + "\" TARGET=_blank>" + username + "</a></div>");

							var uidBlock = '#' + uid;				
							$("a", uidBlock).click(function(event) {
								if (typeof t != 'undefined') {
									window.clearInterval(t);
									$(".reply").die('myEvent');
								}
								sendRecoClickMessage(cId, uid, "user");
								question = "";

							});

							$(id).append(ratingWidget(username));

							starifyU(username, cId);

							// $(id).append('<p

							// id="ajax_response"></p>');

						});


				if (count == 0) {

					// no recos! :(

				}

				$(id).append('</p>');

				$(id).fadeIn("slow");

				return cId;


			}


			// disabling popup

			function disablePopup(id) {

				dataId = 'xxx';				

				$(id).fadeOut("slow");
			}


			function addStyleSheet(style) {

				var getHead = document.getElementsByTagName("HEAD")[0];

				var cssNode = window.document.createElement('style');

				var elementStyle = getHead.appendChild(cssNode);

				elementStyle.innerHTML = style;

				return elementStyle;

			}

			function starifyC(rid, cid) {

				var id = "#ratings" + rid;

				$(id).children().not("select").hide();

				$caption = $("<span/>");

				var loggedInUser = $(".username", $("#top-links"))

				.text();

				console.log('Logged in user: ' + loggedInUser);

				$(id)

				.stars(

						{

							inputType : "select",

							captionEl : $caption, // point to

							callback : function(ui, type, value) {

							if(!loggedInUser)

							{

								alert('Please login to rate!');

								$(id).stars("selectID", -1);

								return;

							}



							var result = createConvRatingXML(

									loggedInUser, rid, cid,

									value);

							var xmlString = (new XMLSerializer())

							.serializeToString(result);

							GM_xmlhttpRequest( {

								method : "POST",

								url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

								data : xmlString,

								onerror : function(response) {

								alert("Error");

							},

							onload : function(response) {

								if (!response.responseXML) {

									response.responseXML = new DOMParser()

									.parseFromString(

											response.responseText,

									"text/xml");

								}

								var xmlResponse = (new

										XMLSerializer())

										.serializeToString(response.responseXML);

								console

								.log(response.status);

								var xml = response.responseXML;

								console

								.log(xmlResponse);

							}

							});

						}

						});

				$caption.appendTo(id);

			}

			;

			function starifyW(rid, cid) {

				var id = "#ratings" + rid;

				$(id).children().not("select").hide();

				$caption = $("<span/>");

				var loggedInUser = $(".username", $("#top-links")).text();

				console.log('Logged in user: ' +  typeof loggedInUser);

				$(id)

				.stars(

						{

							inputType : "select",

							captionEl : $caption, 

							callback : function(ui, type, value) {

							if(!loggedInUser)
							{

								alert('Please login to rate!');

								$(id).stars("selectID", -1);

								return;

							}

							var result = createWebpageRatingXML(

									loggedInUser, rid, cid,

									value);

							var xmlString = (new XMLSerializer())

							.serializeToString(result);

							GM_xmlhttpRequest( {

								method : "POST",

								url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

								data : xmlString,

								onerror : function(response) {

								alert("Error");

							},

							onload : function(response) {

								if (!response.responseXML) {

									response.responseXML = new DOMParser()

									.parseFromString(

											response.responseText,

									"text/xml");

								}

								var xmlResponse = (new

										XMLSerializer())

										.serializeToString(response.responseXML);

								console

								.log(response.status);

								var xml = response.responseXML;

								console

								.log(xmlResponse);



							}

							});

							
						}

						});


				$caption.appendTo(id);

			}

			;

			function starifyU(rid, cid) {

				var id = "#ratings" + rid;

				$(id).children().not("select").hide();


				$caption = $("<span/>");

				var loggedInUser = $(".username", $("#top-links"))

				.text();

				console.log('Logged in user: ' + typeof loggedInUser);

				$(id)

				.stars(

						{

							inputType : "select",

							captionEl : $caption, 


							callback : function(ui, type, value) {

							if(!loggedInUser)

							{

								alert('Please login to rate!');

								$(id).stars("selectID", -1);

								return;

							}

							var result = createUserRatingXML(

									loggedInUser, rid, cid,

									value);

							var xmlString = (new XMLSerializer())

							.serializeToString(result);

							GM_xmlhttpRequest( {

								method : "POST",

								url : "http://cobot.dyndns-ip.com:8080/coboted/xmlMessageReceiver",

								data : xmlString,

								onerror : function(response) {

								alert("Error");

							},

							onload : function(response) {

								if (!response.responseXML) {

									response.responseXML = new DOMParser()

									.parseFromString(

											response.responseText,

									"text/xml");

								}

								var xmlResponse = (new

										XMLSerializer())

										.serializeToString(response.responseXML);

								console

								.log(response.status);

								var xml = response.responseXML;

								console

								.log(xmlResponse);

							}

							});


						}

						});


				$caption.appendTo(id);

			};





			function log(msg) 

			{

				console.log(msg);    


			}



			function rawInput(data)

			{

				console.log('RECV: ' + data);

			}



			function rawOutput(data)

			{

				console.log('SENT: ' + data);

			}



			function onConnect(status)

			{

				if (status == Strophe.Status.CONNECTING) {

					console.log('Strophe is connecting.');

				} else if (status == Strophe.Status.CONNFAIL) {

					console.log('Strophe failed to connect.');

					//$('#connect').get(0).value = 'connect';

				} else if (status == Strophe.Status.DISCONNECTING) {

					console.log('Strophe is disconnecting.');

				} else if (status == Strophe.Status.DISCONNECTED) {

					console.log('Strophe is disconnected.');

					//$('#connect').get(0).value = 'connect';

				} else if (status == Strophe.Status.CONNECTED) {

					console.log('Strophe is connected.');

					//connection.disconnect();	

					connection.addHandler(onMessage, null, 'message', null, null,  null); 

					connection.send($pres().tree());

				}

			}





			function onMessage(msg) {

				var to = msg.getAttribute('to');

				var from = msg.getAttribute('from');

				var type = msg.getAttribute('type');

				var elems = msg.getElementsByTagName('body');

				//parse properties and add to notification div
				//on click, send msg. to backend
					

				if (/*type == "chat" &&*/ elems.length > 0) {

					var body = elems[0];



					console.log('ECHOBOT: I got a message from ' + from + ': ' + 

							Strophe.getText(body));

					//notify
					$().toastmessage({sticky : true});					
					var notification = $().toastmessage('showNoticeToast', Strophe.getText(body));	
					var dataItemId;
					var cid;
					var uid;
					$(msg).find("property").each(function() {
						console.log("Property name: " + $(this).find("name").text());
						console.log("Property value: " + $(this).find("value").text());
						var pName = $(this).find("name").text();
						if(pName=="uid")
							{uid =$(this).find("value").text();}
						else if(pName=="dataId") 								{dataItemId = $(this).find("value").text();}
						else if(pName=="cid")
							{cid = $(this).find("value").text();}
						
						//$(notification)
					});

					//click capture for notification
					 $("p", notification).click(function () { 
					      // 
						sendClicedkMessage(uid, cid);	
    					});	
						
				}
				return true;

			}



			function connect(user) {

				console.log("Trying to connect ... " + user);	

				connection = new Strophe.Connection(BOSH_SERVICE);

				//console.log("Connection: " + connection);	

				connection.rawInput = rawInput;

				connection.rawOutput = rawOutput;

				connection.connect(user+"@saurav-precision-workstation-380", user+"_ccl", onConnect);	



			}





		});
