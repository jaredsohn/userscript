// ==UserScript==
// @name           Batoto - fix sorting of My Follows
// @description    This should fix the sorting of your followed series, showing them properly organized by last update.
// @namespace      http://nosgoroth.com
// @include        http://www.batoto.net/myfollows
// @match	       http://www.batoto.net/myfollows
// ==/UserScript==



////////////////////////
// CONFIG STARTS HERE //
////////////////////////

//Change to the appropriate language code. You very probably don't need to.
var my_language_code = "en-US";
//Technobabble: This is used to load the appropriate version of date.js to
//decode the date string into something usable.

//Do you want this script to keep itself up to date? Yes. Yes you do.
var i_want_autoupdates = true;


////////////////////////
//  CONFIG ENDS HERE  //
////////////////////////




///////////////////////
//  HERE BE DRAGONS  //
///////////////////////


//Array of external script dependencies to be loaded asynchronously.
var scripts = [
  '//datejs.googlecode.com/svn/trunk/build/date-'+my_language_code+'.js',
  '//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js'
];


function main() { //Will be called when the script dependencies have finished loading

	jQuery.noConflict(); //I'm an idiot. This will prevent conflicts with other scripts that use the $ variable. Sorry sorry sorry.
	
	//The main object. I like objects.
	function BatotoSortFixer(elm){
		this.$main = jQuery(elm); //This should be the <table> that contains all the info. elm can be a css-style selector, a DOM object or a jQuery object
		this.attach();
		this.runByDate();
	}
	BatotoSortFixer.prototype.attach = function() { 
		var that = this;
		var $anchor = jQuery(".maintitle").siblings("div").eq(0);
		
		var buttoncss = {
			"float":"left",
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			"margin-right": "5px"
		};
		var buttonClass = "ipsButton";
		
		//Creates the "Sort by name" button and inserts it
		jQuery("<button>").css(buttoncss).addClass(buttonClass)
			.text("Sort by name")
			.click(function(){ that.runByName(); })
			.insertBefore($anchor);
		
		//Creates the "Sort by last update" button and inserts it		
		jQuery("<button>").css(buttoncss).addClass(buttonClass)
			.text("Sort by last update")
			.click(function(){ that.runByDate(); })
			.insertBefore($anchor);
		
		this.list = this.acquire();
	}
	BatotoSortFixer.prototype.runByDate = function() {
		this.write( this.sortDate(this.list) );
	}
	BatotoSortFixer.prototype.runByName = function() {
		this.write( this.sortName(this.list) );
	}
	
	/*
		Grabs list of elements from page, returns it as array of elements with this format:
		elm = {
			first: //jQuery element of the first row of the object (contains image, TITLE, last read info)
			second: //jQuery element of the second row of the object (contains latest chapter info, TIME SINCE UPDATE)
		};
		
		This is necessary because each element has the following unwrapped html:
		<tr>
			<td><!-- Thumbnail --></td>
			<td><!-- Series title --></td>
			<td><!-- Last read info --></td>
		</tr>
		<tr>
			<td><!-- Latest chapter info --></td>
			<td><!-- Correct time since last update in filtered language --></td>
		</tr>
	*/
	BatotoSortFixer.prototype.acquire = function() {
		var that = this;
		var res = [];
		var elm = false;
		this.$main.find("tr").each(function(i,v){
			if (!elm) {
				elm = {first: jQuery(v), second: false};
			} else {
				elm.second = jQuery(v);
				res.push(elm);
				elm = false;
			}
		});
		return res;
	}
	
	BatotoSortFixer.prototype.elmWriteDebug = function(elm) {
		elm.first.find("td").eq(2).text( this.elmToDate(elm).toISOString() );
	}
	
	//Return date from element. Uses date.js
	BatotoSortFixer.prototype.elmToDate = function(elm) {
		var str = elm.second.find("td").eq(1).text();
		str = str.replace(" - ", " ");
		str = str
				.replace("A month", "1 month")
				.replace("A week", "1 week")
				.replace("A day", "1 day")
				.replace("An hour", "1 hour")
				.replace("A minute", "1 minute")
				;
		var dateobj = Date.parse(str);
		return dateobj;
	}
	
	//Return title from element
	BatotoSortFixer.prototype.elmToTitle = function(elm) {
		return elm.first.find("td").eq(1).find("a strong").text();
	}
	
	//Callbacks: return comparison between elms (-1, 0, 1)
	BatotoSortFixer.prototype.sortByDateCallback = function(a,b) {
		var adate = this.elmToDate(a);
		var bdate = this.elmToDate(b);
		return Date.compare(adate, bdate);
	}
	BatotoSortFixer.prototype.sortByNameCallback = function(a,b) {
		var aname = this.elmToTitle(a);
		var bname = this.elmToTitle(b);
		return aname.localeCompare(bname);
	}
	
	//Sorts list by date and returns it
	BatotoSortFixer.prototype.sortDate = function(list) {
		var that = this;
		list.sort(function(a,b){
			try {
				return that.sortByDateCallback(a,b);
			} catch(e) {
				return 0;
			}
		});
		list.reverse();
		return list;
	}
	
	//Sorts list by name and returns it
	BatotoSortFixer.prototype.sortName = function(list) {
		var that = this;
		list.sort(function(a,b){
			return that.sortByNameCallback(a,b);
		});
		return list;
	}
	
	//Write the sorted list back to $main container
	BatotoSortFixer.prototype.write = function(list) {
		var that = this;
		this.$main.empty();
		jQuery.each(list,function(i,v){
			that.$main.append(v.first);
			that.$main.append(v.second);
		});
	}
	
	
	//Object instance
	try {
		new BatotoSortFixer(".ipb_table"); //Yep, that's the table.
	} catch (err) {
		//console.log(err);
	}
	
}



//From http://thinlight.org/2011/11/21/writing-greasemonkey-user-scripts-for-firefox-and-chrome/
//This will asynchronously load all scripts defined in the array at the top of the file. After that, it will run main()
var numScripts = scripts.length, loadedScripts = 0;
var i, protocol = document.location.protocol;
for (i = 0; i < numScripts; i++) {
  var script = document.createElement("script");
  script.setAttribute("src", protocol + scripts[i]);
  script.addEventListener('load', function() {
      loadedScripts += 1;
      if (loadedScripts < numScripts) {
        return;
      }
      var script = document.createElement("script");
      script.textContent = "(" + main.toString() + ")();";
      document.body.appendChild(script);
    }, false);
  document.body.appendChild(script);
}



if (i_want_autoupdates) {
	//From http://userscripts.org/scripts/show/20145
	var SUC_script_num = 127164; try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Batoto Sortfix') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}