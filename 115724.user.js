// TwitterAHEAD
// version 1.0
// 2011-10-15
// Copyright (c) 2011, Ross Goldberg
// Please direct comments/questions to rossruns@gmail.com
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// FIREFOX USERS:
//
// To install in Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF TWITTERAHEAD 
// go to Tools/Manage User Scripts and manually uninstall the 
// previous version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "TwitterAhead", and click Uninstall.
//
// 
// CHROME USERS:
// 
// Chrome natively supports Greasemonkey scripts, so opening the 
// .user.js file inside of Chrome should prompt you to install the file.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF TWITTERAHEAD 
// go to Tools/Extensions and manually uninstall the 
// previous version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
//
// To uninstall, go to Tools/Extensions, select "TwitterAhead", 
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            TwitterAHEAD
// @namespace       http://rossotron.com/tag/greasemonkey/
// @description     On the RunningAHEAD "[Run/Bike/Swim/Weights/Other] Entry" pages, this script adds adds a link that publishes the details of the workout to Twitter. (Allows the user to view/edit content of tweet before it is posted.)   Uses the Twitter "Tweet Button" as described at https://dev.twitter.com/docs/tweet-button .  For questions / comments bugfixes, please contact me at rossruns@gmail.com .
// @version	1.0
// @date		2011-10-15
// @exclude	http://www.runningahead.com/logs/*/workouts/*/edit*
// @exclude	http://www.runningahead.com/logs/*/workouts/new_entry/*
// @exclude	http://www.runningahead.com/logs/*/workouts/new_weight*
// @include    http://www.runningahead.com/logs/*/workouts/*
// ==/UserScript==



var data_url;
var ActivityMileage;
var ActivityTime;
var LinkURL;
var TweetText;
var CustomTweetIframe;
var Data_Field_List, Data_Field;
var Activity_List, Activity_Type, Activity, regexString, regex, results;
var row_list, table_row, action_cell_list, action_cell, temp_list, temp_el;
var url, cb;




Activity_Type = 0;

// Get the page heading to determine what type of activity it is
Activity_List = document.evaluate(
	"//h1",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

Activity = Activity_List.snapshotItem(0);

// Check to see if it's a Run Entry
regex = RegExp("Run Entry");
results = regex.exec(Activity.innerHTML);
if (results)
{
	Activity_Type = '1';
}

// Check to see if it's a Bike Entry
regex = RegExp("Bike Entry");
results = regex.exec(Activity.innerHTML);
if (results)
{
	Activity_Type = '2';
}

// Check to see if it's a Swim Entry
regex = RegExp("Swim Entry");
results = regex.exec(Activity.innerHTML);
if (results)
{
	Activity_Type = '3';
}

// Check to see if it's a Weights Entry
regex = RegExp("Weights Entry");
results = regex.exec(Activity.innerHTML);
if (results)
{
	Activity_Type = '4';
}


CustomTweetIframe = document.createElement("span");


// Get other data depending on what kind of entry it is, propagate twitter button and insert
switch (Activity_Type) {
	
	// Run Entry
	case '1':
     	Data_Field_List = document.evaluate(
		"//tr",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

		for (var i = 0; i < Data_Field_List.snapshotLength; i++) {
    
			Data_Field = Data_Field_List.snapshotItem(i);

			// Look for mileage to report
			regexString = '<th>Distance:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityMileage = results[1]; }


			// Look for time to report
			regexString = '<th>Duration:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityTime = results[1]; }
			
		}


		// Look to see if just time is present

		if (ActivityTime && !(ActivityMileage))
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Ran for ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}

		
		// Look to see if just distance is present

		if (ActivityMileage && !(ActivityTime))
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Ran for ' + ActivityMileage + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}


		// Look to see if both time and distance are present

		if (ActivityMileage && ActivityTime)
		{

			// Create custom tweet with time and distance
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Ran ' + ActivityMileage + ' in ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}

		// If neither time or distance are present, skip creating button

     break;
     
	
	// Bike Entry
	case '2':
		
     	Data_Field_List = document.evaluate(
		"//tr",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

		for (var i = 0; i < Data_Field_List.snapshotLength; i++) {
    
			Data_Field = Data_Field_List.snapshotItem(i);

			// Look for mileage to report
			regexString = '<th>Distance:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityMileage = results[1]; }


			// Look for time to report
			regexString = '<th>Duration:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityTime = results[1]; }
			
		}


		// Look to see if just time is present

		if (ActivityTime && !(ActivityMileage))
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Biked for ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}

		
		// Look to see if just distance is present

		if (ActivityMileage && !(ActivityTime))
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Biked for ' + ActivityMileage + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}


		// Look to see if both time and distance are present

		if (ActivityMileage && ActivityTime)
		{

			// Create custom tweet with time and distance
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Biked ' + ActivityMileage + ' in ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}

		// If neither time or distance are present, skip creating button

     break;

	
	// Swim Entry
	case '3':
		
     	Data_Field_List = document.evaluate(
		"//tr",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

		for (var i = 0; i < Data_Field_List.snapshotLength; i++) {
    
			Data_Field = Data_Field_List.snapshotItem(i);

			// Look for mileage to report
			regexString = '<th>Distance:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityMileage = results[1]; }


			// Look for time to report
			regexString = '<th>Duration:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityTime = results[1]; }
			
		}


		// Look to see if just time is present

		if (ActivityTime && !(ActivityMileage))
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Swam for ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}

		
		// Look to see if just distance is present

		if (ActivityMileage && !(ActivityTime))
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Swam for ' + ActivityMileage + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}


		// Look to see if both time and distance are present

		if (ActivityMileage && ActivityTime)
		{

			// Create custom tweet with time and distance
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Swam ' + ActivityMileage + ' in ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}

		// If neither time or distance are present, skip creating button

     break;


	case '4':
     	Data_Field_List = document.evaluate(
		"//tr",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

		for (var i = 0; i < Data_Field_List.snapshotLength; i++) {
    
			Data_Field = Data_Field_List.snapshotItem(i);

			// Look for time to report
			regexString = '<th>Duration:</th><td style="Width:100%;">(.+)</td>';
			regex = RegExp(regexString);
			results = regex.exec(Data_Field.innerHTML);

			if (results) {	ActivityTime = results[1]; }
			
		}


		// Look to see if just time is present

		if (ActivityTime)
		{

			// Create custom tweet with just time
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Lifted weights for ' + ActivityTime + '. (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';
		}
		else
		{
			// Create custom tweet with the default text
			TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Posted a new weights entry (via http://runningAHEAD.com)&count=none';

			// Encode string for use in iframe call
			data_url = encodeURI(TweetText);

			// Create custome iframe for 
			CustomTweetIframe.innerHTML = '&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:65px; height:20px; padding-left:1em;"></iframe>';

		}

     break;


	// Other workout type - I don't know the message to include, 
	// so make it a generic link to workout and let people customize themselves
     default:

		TweetText = 'http://platform.twitter.com/widgets/tweet_button.html?text=' + 	'Posted a new workout entry (via http://runningAHEAD.com)&count=none';

		// Encode string for use in iframe call
		data_url = encodeURI(TweetText);

		// Create custome iframe for 
		CustomTweetIframe.innerHTML = '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="' + data_url + '" style="width:130px; height:40px;"></iframe>';
}



// Find buttons at top of page to insert Twitter Button after them
temp_list = document.evaluate(
	"//span[@class='Button']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

temp_el = temp_list.snapshotItem(0);

// Insert Button after others	
temp_el.parentNode.insertBefore(CustomTweetIframe, temp_el.nextSibling);





/*
TODO:
- URL shortening to allow more room in the twitter box?
- Works on individual workout pages, try to get to work on main workout page

1.0 - 20111015 - Initial release
*/

// END FILE	