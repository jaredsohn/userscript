// ==UserScript==
// @name           LT Talk Links
// @namespace      http://userscripts.org/users/qebo
// @include        http://*.librarything.tld/talk*
// @include        http://*.librarything.tld/topic*
// @grant	   none
// ==/UserScript==

// ================================================

var n_size = '75';  // NOTE: This % of header font size becomes link font size.
var e_ul_talk = document.getElementById('li_more').parentNode;
var e_li_world;

// ================================================
// NOTE: Not necessary unless changing font size.

initTalk();

// ================================================
// NOTE: Not necessary unless either changing the text or hiding the item.
// For items that have subitems, it's all or nothing, so show/hide the item only.
// The subitems cannot be hidden independently.  LT brings them back.  

initHeader('LibraryThing', 'LibraryThing', true);		
initLink('li_alltopics', 'All Topics', true);		
initLink('li_hottopics', 'Hot Topics', true);		
initLink('li_bugtracking', 'Bug Tracking', true);	
	
initHeader('Your world', 'Your World', true);
initLink('li_groupsandposts', 'Groups and Posts', false);
initLink('li_yourgroups', 'Group', true);
//initLink('li_yourgroups_member', 'Member', true);  			// NOTE: Subitem of yourgroups.
//initLink('li_yourgroups_watching', 'Watching', true); 		// NOTE: Subitem of yourgroups.
initLink('li_youvepostedto', '- Post', true);
initLink('li_starred', '- Star', true);
initLink('li_startedbyyou', '- Init', true);
initLink('li_groupsyouadmin', 'Group - Admin', true);

initHeader('Book discussions', 'Book Discussions', true);
initLink('li_bookdiscussions', 'All Books', true);			
initLink('li_bookdiscussions_books', 'Books', true);			// NOTE: Subitem of bookdiscussions.
initLink('li_bookdiscussions_authors', 'Authors', true);		// NOTE: Subitem of bookdiscussions.
initLink('li_bookdiscussions_series', 'Series', true);			// NOTE: Subitem of bookdiscussions.
initLink('li_yourbooks', 'Your Books', true); 
initLink('li_yourbooks_yourbooks', 'Books', true);			// NOTE: Subitem of yourbooks.
initLink('li_yourbooks_yourauthors', 'Authors', true);			// NOTE: Subitem of yourbooks.
initLink('li_yourbooks_yourauthorsbooks', "Authors' Books", true); 	// NOTE: Subitem of yourbooks.
initLink('li_yourbooks_series', 'Series', true);			// NOTE: Subitem of yourbooks.

initHeader('Post', 'Post', false);
initPost('Post a new topic', 'Post a New Topic', false);	

initHeader('More options »', 'More Options »', false);
initHeader('« Fewer options', '« Fewer Options', false);
initLink('li_more_localgroups', 'Group - Local', false);
initLink('li_more_favoritemessages', '- Favorite', true);
initLink('li_more_ignoredtopics', '- Ignore', true);

// ================================================
// NOTE: Not necessary unless changing order of items under Your World.
// List in reverse order.

findWorld();
orderWorld('li_more_ignoredtopics');
orderWorld('li_more_favoritemessages');
orderWorld('li_starred');
orderWorld('li_youvepostedto');
orderWorld('li_startedbyyou');
//orderWorld('li_more_localgroups');
orderWorld('li_yourgroups');
orderWorld('li_groupsyouadmin');

// ================================================
// NOTE: Not necessary unless adding links to group pages.

addSection('Groups', true);

addCategory('Groups', 'challenge');
addLink('challenge', 'club (2012)', 'clubread2012');
addLink('challenge', 'dewey decimal', 'deweydecimalchalleng');
addLink('challenge', 'magazine', 'newyorkermagazinesup');
addLink('challenge', 'non-fiction', 'nonfictionchallenge');
addLink('challenge', '75 (2012)', '75booksin2012');
addLink('challenge', 'sidebar', 'lxxvsidebar');

addCategory('Groups', 'books');
addLink('books', 'non-fiction', 'nonfictionreaders');
addLink('books', 'biography', 'biographiesmemoirsa');
addLink('books', 'presidents', 'uspresidentschalleng');
addLink('books', 'states', 'fiftystatesfictionor');
addLink('books', 'global', 'readinggloballyficti');
addLink('books', 'time', 'readingthroughtime');

addCategory('Groups', 'subjects');
addLink('subjects', 'ecology', 'ecologyandtheenviron');
addLink('subjects', 'evolution', 'evolve');
addLink('subjects', 'gardening', 'gardensbooks');
addLink('subjects', 'genealogy', 'genealogylt');
addLink('subjects', 'math', 'mathematics');
addLink('subjects', 'programming', 'purelyprogrammers');
//addLink('subjects', 'running', 'runningreaders');
addLink('subjects', 'science', 'science');

addCategory('Groups', 'data');
addLink('data', 'ck', 'commonknowledge');
addLink('data', 'ht,wt', 'helpthingandwikithin');
addLink('data', 'combiners!', 'combiners');
//addLink('data', 'taggers!', 'taggers');

addCategory('Groups', 'features');
//addLink('features', 'ask', 'asklibrarything');
addLink('features', 'beta', 'boardforextremething');
addLink('features', 'new', 'newfeatures');
addLink('features', 'rsi', 'recommendsiteimprov');
addLink('features', 'site', 'sitetalk');
//addLink('features', 'welcome', 'welcometolibrarythin');

addCategory('Groups', 'technical');
addLink('technical', 'api', 'librarythingapidevel');
addLink('technical', 'hacking', 'hackinglibrarything');

addCategory('Groups', 'social');
addLink('social', 'meetup', 'librarythinggatherin');

// ================================================

// ================================================
// insertAfter()
// ================================================
function insertAfter(e_li_before, e_li_after)
{
  e_li_before.parentNode.insertBefore(e_li_after, e_li_before.nextSibling);
}

// ================================================
// initTalk()
// Set the font size of the links to n_size% (defined above).
// ================================================
function initTalk()
{
  var css_li_talk = 'font-size:' + n_size + '%';

  var ae_li_talk = e_ul_talk.getElementsByTagName('li');

  for (i = 0; i < ae_li_talk.length; i++) 
  { 
    if ((ae_li_talk[i].id != '') || (ae_li_talk[i].className == 'link'))
    {
      ae_li_talk[i].setAttribute('style', css_li_talk);
    }
  }
}

// ================================================
// findWorld()
// Find the World header.
// ================================================
function findWorld()
{
  var ae_li_talk = e_ul_talk.getElementsByTagName('li');

  for (i = 0; i < ae_li_talk.length; i++)
  {
    if (ae_li_talk[i].className == 'h2')
    {
       e_li_world = ae_li_talk[i];
       return;
    }
  }
}

// ================================================
// orderWorld()
// Insert this item immediately after the World header.
// ================================================
function orderWorld(s_id_item)
{
  var e_li_item = document.getElementById(s_id_item);

  if ((e_li_world != null) && (e_li_item != null))
  {
    insertAfter(e_li_world, e_li_item);

    // Your Groups subitems are not children, so must be moved explicitly.
    if (e_li_item.id == 'li_yourgroups')
    {
      var ae_ul_talk = e_ul_talk.getElementsByTagName('ul');
      var e_ul_sub;

      for (i = 0; i < ae_ul_talk.length; i++)
      {
        if (ae_ul_talk[i].className == 'subitem_group group_yourgroups')
        {
          e_ul_sub = ae_ul_talk[i];
          break;
        }
      }
      if (e_ul_sub != null)
      {
         insertAfter(e_li_item, e_ul_sub);
      }
    }
  }
}

// ================================================
// initHeader()
// Change the text and show/hide a header item 
// (which does not have an ID).
// ================================================
function initHeader(s_text_old, s_text_new, b_show)
{
  var ae_li_talk = e_ul_talk.getElementsByTagName('li');

  for (i = 0; i < ae_li_talk.length; i++)
  {
    if (ae_li_talk[i].childNodes[0].nodeValue == s_text_old)
    {
      if (b_show)
      {
        if (s_text_new != '') 
        {
          ae_li_talk[i].childNodes[0].nodeValue = s_text_new;
        }
      }
      else
      {
        ae_li_talk[i].style.display = 'none';
      }
      return;
    }
  }
}

// ================================================
// initPost()
// Change the text and show/hide the Post item 
// (which does not have an ID, and whose text is in its child a element).
// ================================================
function initPost(s_text_old, s_text_new, b_show)
{
  var ae_li_talk = e_ul_talk.getElementsByTagName('li');
  var ae_a_talk;

  for (i = 0; i < ae_li_talk.length; i++)
  {
    ae_a_talk = ae_li_talk[i].getElementsByTagName('a');

    if (ae_a_talk.length > 0)
    {
      if (ae_a_talk[0].childNodes[0].nodeValue == s_text_old)
      {
        if (b_show)
        {
          if (s_text_new != '') 
          {
            ae_a_talk[0].childNodes[0].nodeValue = s_text_new;
          }
        }
        else
        {
          ae_li_talk[i].style.display = 'none';
        }
      }
      return;
    }
  }
}

// ================================================
// initLink()
// Change the text and show/hide a link item 
// (which can be referenced by its ID).
// ================================================
function initLink(s_id, s_text_new, b_show)
{
  var e_li_talk = document.getElementById(s_id);

  if (b_show)
  {
    if (s_text_new != '') 
    {
      e_li_talk.childNodes[0].nodeValue = s_text_new;
    }
  }
  else
  {
    e_li_talk.style.display = 'none';
  }
}

// ================================================
// addSection()
// Create a new header and child list.
// ================================================
function addSection(s_text_section, b_separate)
{
  var e_ul_section = document.createElement('ul');
  var e_li_section = document.createElement('li');

  e_ul_section.id = 'section_' + s_text_section;
  if (b_separate) 
    e_li_section.className = 'separation h2'	
  else 
    e_li_section.className = 'h2';

  e_li_section.appendChild(document.createTextNode(s_text_section));
  e_li_section.appendChild(e_ul_section);
  e_ul_talk.appendChild(e_li_section);
}

// ================================================
// addCategory()
// Create a category header and a child list under the designated header.
// ================================================
function addCategory(s_text_section, s_text_category)
{
  var css_ul_category = 'margin-bottom:0;padding-bottom:0';
  var css_li_category = 'font-size:' + n_size + '%;font-weight:bold';

  var e_ul_category = document.createElement('ul');
  var e_li_category = document.createElement('li');
  var e_ul_section = document.getElementById('section_' + s_text_section);

  e_ul_category.id = 'category_' + s_text_category;
  e_ul_category.setAttribute('style', css_ul_category);
  e_li_category.setAttribute('style', css_li_category);

  e_li_category.appendChild(document.createTextNode(s_text_category));
  e_li_category.appendChild(e_ul_category);
  e_ul_section.appendChild(e_li_category);
}

// ================================================
// addLink()
// Create a link to a group page under the designated category.
// ================================================
function addLink(s_text_category, s_text_link, s_link) 
{
  var css_li_link = 'font-weight:normal';

  var e_a_link = document.createElement('a');
  var e_li_link = document.createElement('li');
  var e_ul_category = document.getElementById('category_' + s_text_category);

  e_a_link.setAttribute('href', '/groups/' + s_link + '#bigTable');
  e_li_link.setAttribute('style', css_li_link);

  e_a_link.appendChild(document.createTextNode(s_text_link));
  e_li_link.appendChild(e_a_link);
  e_ul_category.appendChild(e_li_link);  
}
