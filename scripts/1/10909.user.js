// ==UserScript==
// @name          Craig's List search filter
// @description   A way to make up for the deficiencies of search on Craig's List
// @include       *.craigslist.org/search/jjj*
// ==/UserScript==
// You could also use this script to filter out other stuff like
// rooms.  I've added comments to show how to do so if you're looking
// for a room in the bay area, but want to leave out those in santa
// cruz and san jose downtown.  You would also change the include
// variable above to *sfbay.craigslist.org/search/roo* to use the 
// altered script.  This script was written after reading the Craig's
// List Goon Filter script.

//regular expression to remove all categories I'm not interested in
var remove_categories = /sales|healthcare|real.*?estate|nonprofit|admin\/office|accounting\/finance|legal\/para
legal|marketing\/advertising\/pr|art\/media\/design|business\/mgmt|food\/beverage\/hospitality|skilled.*?trades
\/artisan|salon\/spa\/fitness|et.*?cetera|tv\/film\/video\/radio|general.*?labor|retail\/wholesale|manufacturin
g|security|education\/teaching|transportation|human.*?resource/i;

// var remove_categories = /santa\ cruz|san\ jose\ downtown/i;

//turn the preceding regular expression into a properly formatted string
var category_alert = remove_categories.toString().replace(/\|/g, ", ");
category_alert = category_alert.replace(/\.\*\?/g, " ");
category_alert = category_alert.replace(/^\/|\\|\/\w+$/g, "");

//find the category in the html
var category_regexp = /\&lt;\&lt;<i><a(.*?)<\/a><\/i><\/p>/i;

// var category_regexp = /<\/a><font.*?\((.*?)\)<\/font>/i;

//get the html and use the preceding regexp to filter it
var page_source = document.body.innerHTML;
var page_lines = page_source.split("\n");

for ( i = 0; i < page_lines.length; i++)
{
   if (category_regexp.test(page_lines[i]))
   {
      var entries = page_lines[i].split("<p>");
      for ( k = 0; k < entries.length; k++)
      {
         if (remove_categories.test(entries[k]))
         {
            entries[k] = "";
         }
      }
      page_lines[i] = entries.join("<p>").replace(/(<p>){2,}/g, "<p>");
   }
}

//add a warning so the user knows that certain categories were filtered and output
page_source = "<p>The following categories were removed by a greasemonkey script: " + category_alert + "</p>";
page_source += page_lines.join("\n");
document.body.innerHTML = page_source;