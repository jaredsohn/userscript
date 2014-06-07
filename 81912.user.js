// ==UserScript==
// @name           Hide anonymous AskMeFi posts
// @namespace      http://userscripts.org/users/157895
// @include        http://ask.metafilter.com/*
// ==/UserScript==

/*

First, I should make it clear that no offence is intended by this wee script. 

Second, read this: http://metatalk.metafilter.com/19379/Anonymous-Ask-MetaFilter-we-need-to-talk

Third, 95% of the anonymous threads I see shouldn't be. And the rest are juicy human interest stories that I couldn't care less about.

If anyone else is in the same boat, this script is for you.

It will seamlessly hide all anonymous postings on AskMeFi using a bit of deft DOM-node crawling: http://ask.metafilter.com/

I like this. I'm using it on all my computers now. MetaFilter is better (for me! Perhaps not for you! But definitely for me!) because of this script. So, thank you, me.

Regards,
Nick
July 20, 2010

*/

anonymouse = document.getElementsByTagName('em'); 

for ( var i in anonymouse ) 

{

	if (anonymouse[i].innerHTML == 'anonymous') {
	
		var theOffendingEntry = anonymouse[i].parentNode.parentNode.parentNode;
		
		theOffendingEntry.style.display = 'none';
		
		theOffendingEntry.nextSibling.style.display = 'none';
		
	}

}

/*

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/