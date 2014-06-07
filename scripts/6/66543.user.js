// ==UserScript==
// @name           cn_ubb_enhance
// @namespace      http://shutterfreak.net/xtra/greasemonkey/ubb_enhance
// @description    Enhance CN forums by adding short links to individual posts in flat mode. It works in the live forums and in the forum archives.
// @author         Olivier Biot with contributions from Greg Kettell
// @version        $Id 0.5 (2010-01-17) $
// @include        http://www.cloudynights.com/ubbthreads/showflat.php*
// @include        http://www.cloudynights.com/ubbthreads/showthreaded.php*
// @include        http://www.cloudynights.com/ubbarchive/showflat.php*
// @include        http://www.cloudynights.com/ubbarchive/showthreaded.php*
// @include        http://cloudynights.com/ubbthreads/showflat.php*
// @include        http://cloudynights.com/ubbthreads/showthreaded.php*
// @include        http://cloudynights.com/ubbarchive/showflat.php*
// @include        http://cloudynights.com/ubbarchive/showthreaded.php*
// ==/UserScript==

/* History
 * 0.5   - Completely rewrote the Messier/NGC/IC matching code to correctly
 *         handle the DOM tree instead of a crude yet smart innerHTML search
 *         and replace.
 * 0.4.5 - Leave nonexistent Messiers (e.g. M111) untouched. All versions since
 *         0.4 are affected and show 'undefined' instead of the original label.
 * 0.4.4 - The script may run before the images have been loaded, resulting in
 *         reported image dimensions of 0x0 or 70x16 (sigh), or in the image not
 *         being reported yet. Fixes and changes (Greg K. 1/16/2010):
 *         - Added a exception for 0x0 (and 70x16 - sigh) images in the 'small
 *           image' check.
 *         - Added a 1px solid border for non-oversized images (sometimes no
 *           border was showing).
 *         - Moved image popup code into a separate function for readability.
 *         - Moved tooltip title code into a mouseover handler so it gets the
 *           sizes in real time.
 *         - Added 'cloudynights.com/stars' to the external image check, star
 *           contributor stars were showing as external.
 * 0.4.3 - Do not show the popup for img tags if they are smaller than the
 *         minimal size (cn_img_minWidth x cn_img_minHeight).
 * 0.4.2 - Added popups for img tags in posts (Greg K. 1/14/2010). Highlight
 *         images that exceed the maximum CN image size by a dashed red border.
 *         Image dimensions and whether they're internal/external to CN is added
 *         to the image tooltip title.
 * 0.4.1 - Regular expressions for NGC/IC/M objects were too greedy by nature.
 *         Add '\b' at start and end of each RE to stop at word boundaries.
 *         Rewrite cn_forum_base_url() and cn_forum_flat_mode() to use regular
 *         expressions instead of a plethora of string comparisons.
 *         After running javascript weblint: fix equality test that was written
 *         as an assignment in ubb_post_link().
 * 0.4   - Added Messier links to the NGC/IC project. Changed the way posts
 *         were parsed to include parsing of quoted posts in messages. Also
 *         parse when on 'cloudynights.com' next to 'www.cloudynights.com'.
 *         Document the software code.
 * 0.3.5 - Added links to the NGC/IC project for NGC and IC labels only.
 * 0.3.3 - Added post links to flat mode.
 * 0.2   - Fix some errors.
 * 0.1   - First version: provide links to individual posts in threaded mode
 *         when in flat mode.
 */

var cn_ubb_enhance_VERSION = '0.5';


// Constants
var cn_img_maxHeight = 800;
var cn_img_maxWidth  = 800;
var cn_img_minHeight = 100;
var cn_img_minWidth  = 100;



/* @return: the base URL for the CN forums (live versus archive).
 */
function cn_forum_base_url()
{
	var re = new RegExp( /http:\/\/(www\.)?cloudynights\.com\/(ubbthreads|ubbarchive)\// );
	var m = re.exec(document.location.href);
	if ( m != null ) {
		if  (m.index == 0 ) {
			return ( 'http://www.cloudynights.com/' + m[2] );
		}
	}
	return null;
}

/* @return: true if the user is viewing a forum thread in 'flat' mode (one reply after the other).
 */
function cn_forum_flat_mode()
{
	var re = new RegExp( /http:\/\/(www\.)?cloudynights\.com\/(ubbthreads|ubbarchive)\/showflat\.php/ );
	var m = re.exec(document.location.href);
	if ( m != null ) {
		if ( m.index == 0 ) {
			return true;
		}
	}
	return false;
}

/* @return: true if the parameter can be resolved to a number.
 */
function is_numeric(input)
{
	return ( (input - 0) == input && input.length > 0 );
}

/* Sanitizes the link type: it can only be 'flat' or 'threaded'. Defaults to 'flat'.
 */
function check_link_type(link_type)
{
	if ( link_type == 'threaded' ) {
		return 'threaded';
	}
	return 'flat';
}

/* Create an Ubb.Threads link to the message.
 * @param post_id: the numeric identifier of the post in the Ubb database.
 * @param id_prefix: a string prefix used in the 'id' atribute of the link we're building.
 * @param link_type: create a link to the post in 'flat' (default) mode or in 'threaded' mode.
 */
function ubb_post_link(post_id, id_prefix, link_type)
{
	link_type = check_link_type(link_type);
	var link = document.createElement('a');
	link.href = cn_forum_base_url() + '/show' + link_type + '.php/Number/' + post_id;
	if ( link_type == 'flat' ) { // Add the anchor to the selected post in the thread page:
		link.href += '#Post' + post_id;
	}
	link.setAttribute('id', id_prefix + '-' + link_type + '-' + post_id);
	return link;
}

/* Add a browse link to the UBB Context of a given post
 * @param post_id: the numeric identifier of the post in the Ubb database.
 * @param link_type: create a link to the post in 'flat' (default) mode or in 'threaded' mode.
 */
function add_ubb_context_link(post_id, link_type)
{
	link_type = check_link_type(link_type);
	// Create a link element that will contain the short,
	// quick link to the post in flat mode:
	var link = ubb_post_link(post_id, 'post_link', link_type);
	link.setAttribute('target', '_blank');
	// Add an image icon for the link:
	var img = document.createElement('img');
	img.setAttribute('src','http://www.cloudynights.com/ubbthreads/images/' + link_type + '.gif');
	img.setAttribute('border', "0");
	// First add the icon, then the text:
	link.appendChild(img);
	link.appendChild(document.createTextNode( '('+link_type+')' ) );
	return link;
}

/* This code creates the popup for displaying the Ubb code to link to a given
 * post once the popup link has been clicked. It is called from within the page,
 * see add_ubb_link_popup().
 * @param post_id: the numeric identifier of the post in the Ubb database.
 * @param title: the title of the post we're creating the link for.
 * @param link_type: create a link to the post in 'flat' (default) mode or in 'threaded' mode.
 */
function ubb_link_popup(post_id, title, link_type)
{
	link_type = check_link_type(link_type);
	var link = ubb_post_link(post_id, 'post_link_popup', link_type);
	node = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' + '<html><head>' + '<title>Create link to post #' + post_id +': ' + title + ' (' + link_type + ' mode)</title>' + '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />' + '<link rel="stylesheet" href="/ubbthreads/stylesheets/template.css" type="text/css" />' + '</head><body>' + '<textarea name="linkfield-' + link_type + '-' + post_id + '" id="linkfield-' + post_id + '" cols="60" rows="5">' + '[url=' + link + ']' + title + '[/url]' + '</textarea>' + '<p>Copy the text above and paste it in a post if you want to link to this post.</p>' + '<p><a href="javascript:self.close()">Close this Window</a></p>' + '</body></html>';
	popup = window.open("", "Create_link_to_post", "resizeable,width=520,height=200,status=0,toolbar=0,scrollbars=1");
	popup.document.write(node);
	popup.document.close();
}

/* Mapping of Messier sequence number to the related NGC-IC database identifiers.
 * Missing Messier entries have a 'null' entry (M0, M102).
 * Messier entries that match with multiple NGC-IC database objects yield a comma-separated list (M76).
 */
var messier_ngcic_db_lookup = [ 
	null,
	'NGC 1952', 'NGC 7089', 'NGC 5272', 'NGC 6121', 'NGC 5904', 'NGC 6405', 'NGC 6475', 'NGC 6523', 'NGC 6333', 'NGC 6254',
	'NGC 6705', 'NGC 6218', 'NGC 6205', 'NGC 6402', 'NGC 7078', 'NGC 6611', 'NGC 6618', 'NGC 6613', 'NGC 6273', 'NGC 6514',
	'NGC 6531', 'NGC 6656', 'NGC 6494', 'NGC 6603', 'IC 4725', 'NGC 6694', 'NGC 6853', 'NGC 6626', 'NGC 6913', 'NGC 7099',
	'NGC 224', 'NGC 221', 'NGC 598', 'NGC 1039', 'NGC 2168', 'NGC 1960', 'NGC 2099', 'NGC 1912', 'NGC 7092', 'Winnecke 4',
	'NGC 2287', 'NGC 1976', 'NGC 1982', 'NGC 2632', 'Melotte 22', 'NGC 2437', 'NGC 2422', 'NGC 2548', 'NGC 4472', 'NGC 2323',
	'NGC 5194', 'NGC 7654', 'NGC 5024', 'NGC 6715', 'NGC 6809', 'NGC 6779', 'NGC 6720', 'NGC 4579', 'NGC 4621', 'NGC 4649',
	'NGC 4303', 'NGC 6266', 'NGC 5055', 'NGC 4826', 'NGC 3623', 'NGC 3627', 'NGC 2682', 'NGC 4590', 'NGC 6637', 'NGC 6681',
	'NGC 6838', 'NGC 6981', 'NGC 6994', 'NGC 628', 'NGC 6864', 'NGC 650, NGC 651', 'NGC 1068', 'NGC 2068', 'NGC 1904', 'NGC 6093',
	'NGC 3031', 'NGC 3034', 'NGC 5236', 'NGC 4374', 'NGC 4382', 'NGC 4406', 'NGC 4486', 'NGC 4501', 'NGC 4552', 'NGC 4569',
	'NGC 4548', 'NGC 6341', 'NGC 2447', 'NGC 4736', 'NGC 3351', 'NGC 3368', 'NGC 3587', 'NGC 4192', 'NGC 4254', 'NGC 4321',
	'NGC 5457', null, 'NGC 581', 'NGC 4594', 'NGC 3379', 'NGC 4258', 'NGC 6171', 'NGC 3556', 'NGC 3992', 'NGC 205'
];

/* Make a clickable link to the NGC-IC project page for the object.
 * @param id The key in the NGC-IC project database
 * @param label The label to display on the clickable link
 * @return The form element with the link to the NGC/IC project
 */
function make_ngcic_project_link(id, label)
{
	var form = document.createElement('form');
	form.method = 'POST';
	form.action = 'http://www.ngcicproject.org/ngcicdb.asp';
	form.target = '_blank';
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = 'ngcicobject';
	input.value = id;
	form.appendChild(input);
	var submit = document.createElement('input');
	submit.type = 'submit';
	submit.value = label;
	submit.setAttribute('style', 'display:inline;padding:0;margin:0;border:1px dotted #aaaaaa' );
	form.appendChild(input);
	form.appendChild(submit);

	return form;
}


/* Search a post for DSO references and add a link to the NGC/IC project whenever possible.
 * @param node The starting node in the DOM tree
 */
function add_dso_links( node )
{
	var parent_node = node.parentNode;
	if ( (node.nodeType == 3) && (parent_node.tagName != 'A') && (parent_node.tagName != 'IMG') ) {
		// Text node that is neither part of a hyperlink ('A') or image ('IMG')
		// APPROACH:
		var text = node.nodeValue; // 1. Store the text node text value
		var index = -1;
		var dso_match = false;
		var fragment = document.createDocumentFragment(); // Will contain the replacement for the current node
		do { // 2. Parse the text node text value
			index = text.search(/\b(M|N|NGC|IC)([-]|\s*)(\d+)\b/);
			if (index >= 0) { // Match
				dso_match = true; // We had a match, hence we will have to replace the text node with a new node list
				var arr = text.match(/\b(M|N|NGC|IC)([-]|\s*)(\d+)\b/);
				if ( arr[1] == 'M') { // Messier
					// First print the text fragment up to and including the Messier reference (the matched pattern):
					fragment.appendChild( document.createTextNode( text.substring(0, index + arr[0].length ) ) );
					if ( (arr[3] > 0) && (arr[3] < 111) ) { // Valid Messier reference (M1--M110)
						// Lookup the NGC number for the Messier object in order to create the NGC/IC project link:
						var refs = messier_ngcic_db_lookup[ arr[3] ];
						if (refs != null) { // Existing Messier object
							fragment.appendChild( document.createTextNode( ' (' ) );
							var ref_list = refs.split(', ');
							// Rewrite the text node:
							var k = 0;
							while ( k < ref_list.length - 1 ) {
								fragment.appendChild( make_ngcic_project_link( ref_list[k], ref_list[k] ) );
								fragment.appendChild( document.createTextNode( ', ' ) );
								k++;
							}
							fragment.appendChild( make_ngcic_project_link( ref_list[k], ref_list[k] ) );
							fragment.appendChild( document.createTextNode( ')' ) );
						} // else: refs is null (Nonexistent Messier object): do not add any information
					} // else: Messier ID is invalid (Not a Messier object): do not add any information
				} else { // NGC/IC
					fragment.appendChild( document.createTextNode( text.substring(0, index) ) );
					fragment.appendChild( make_ngcic_project_link( (arr[1] == 'N' ? 'NGC' : arr[1]) + ' ' + arr[3], arr[0] ) );
				}
				text = text.substr( index + arr[0].length ); // Skip matching RE and its length
			}
		} while (index >= 0);
		if ( dso_match ) { // 3. Replace the current text node with a mix of text nodes and other nodes (containing the link to NGC/IC)
			// First add the remaining text to the DOM fragment
			fragment.appendChild( document.createTextNode( text ) );
			// Now replace the current text node with the created node fragment:
			node = parent_node.replaceChild( fragment, node );
		}
	} else { // In a node tree
		var nodes = node.childNodes;
		if ( nodes ) {
			// Bottom-up recursion to avoid endless recursion
			var i = nodes.length;
			while ( i-- ) {
				add_dso_links( nodes[i] );
			}
		}
	}
}



/* Process all posts and add links to the NGC-IC project database for NGC, IC and Messier objects.
 */
function parse_cn_forum_messages()
{
	var tables = document.getElementsByTagName( 'table' );
	// alert('There are ' + tables.length + ' tables in this document.');
	for ( var i = 0; i < tables.length; i++ ) {
		if ( tables[i].className.search( 'tableborders' ) >= 0 ) {
			// alert('Table ' + i + ' matches class=tableborders!\n\n' + tables[i].className);
			var tds = tables[i].getElementsByTagName( 'td' );
			for ( var j = 0; j < tds.length; j++ ) {
				if ( tds[j].className.search( 'lighttable' ) >= 0 ) {
					// A valid post starts with '<br>\n<font class="post">':
					if ( tds[j].innerHTML.substr( 0, 25 ).search( '<br>\n<font class="post">' ) > 0 ) { // Parse the post 
						// Process Deep-Sky Object references (Messier, NGC and IC)
						add_dso_links( tds[j] );
						// Process images in a post to open popup when clicked
						add_image_popups( tds[j] );
					}
				}
			}
		}
	}
}



/* Add a popup for images in a post.
 */
function add_image_popups(parent_node)
{
	var imgs = parent_node.getElementsByTagName('img');
	for (var k = 0; k < imgs.length; k++) {
		var img = imgs[k];
		// skip if image is already in a link (like a clear sky chart)... or if it's a graemlin or other internal CN image.
		if (img.parentNode.tagName != "A" && img.src.search("cloudynights.com/ubbthreads/images/") == -1 && img.src.search("cloudynights.com/ubbthreads/pictures/") == -1) {
			var w = img.width;
			var h = img.height;
			if (!(w == 0 && h == 0) && !(w == 70 && h == 16) && (w <= cn_img_minWidth) && (h <= cn_img_minHeight) ) {
				if (img.src.search("cloudynights.com/ubbthreads/") == -1 && img.src.search("cloudynights.com/stars/") == -1) {
					img.title += ' external ';
				}
				img.title += 'image (' + w + ' x ' + h + ')';
			} else {									
				if ( (w > cn_img_maxWidth) || (h > cn_img_maxHeight) ) {
					img.style.border = '2px dashed #f00';
				} else {
					img.style.border = '1px solid';
				}
				var link = document.createElement('a');
				link.href = "javascript:void(0)";
				link.appendChild(img.cloneNode(true));
				link.addEventListener('mouseover', function() {
							var img = this.getElementsByTagName('img')[0];
							var w = img.width;
							var h = img.height;
							img.title = 'Click to open this ';
							if (img.src.search("cloudynights.com/ubbthreads/") == -1) {
								img.title += 'external ';
							}
							img.title += 'image (' + w + ' x ' + h + ') in another window';
							if ( (w > cn_img_maxWidth) || (h > cn_img_maxHeight) ) {
								img.title += ' exceeds maximum (' + cn_img_maxWidth + ' x ' + cn_img_maxHeight + ')';
								img.style.border = '2px dashed #f00';
							} else {
								img.style.border = '1px solid';
							}
						}, false); 
				link.addEventListener('click', function() {
							var img = this.getElementsByTagName('img')[0];
							var w = ((img.width <= cn_img_maxWidth) ? img.width : cn_img_maxWidth);
							var h = ((img.height <= cn_img_maxHeight) ? img.height : cn_img_maxHeight); 
							var node = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' + 
								   '<html><head>' + '<title>Image Popup: ' + img.src + '</title>' + '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />' + 
								   '<link rel="stylesheet" href="/ubbthreads/stylesheets/template.css" type="text/css" />' + 
								   '</head><body><img border="0" src="' + img.src + '" /></body></html>';
							popup = window.open("", "cn_img_window", "resizable,width=" + w + ",height=" + h + ",scrollbars=1"); 
							popup.document.write(node);
							popup.document.close();
							popup.focus();
							return false; 
						}, false); 
				img.parentNode.replaceChild(link, img);
			}
		}
	}
}



/* Add a popup link for displaying the Ubb code to link to a given post
 * @param post_id: the numeric identifier of the post in the Ubb database.
 * @param title: the title of the post we're creating the link for.
 * @param link_type: create a link to the post in 'flat' (default) mode or in 'threaded' mode.
 */
function add_ubb_link_popup(post_id, title, link_type)
{
	link_type = check_link_type(link_type);
	var popup = document.createElement('a');
	// popup.href='#';
	popup.href = "javascript:void(0)";
	popup.setAttribute('id', 'popup-' + link_type + '-' + post_id);
	popup.addEventListener('click', function() { ubb_link_popup(post_id, title, link_type); }, false);
	// Add a link text to the popup link:
	popup.appendChild(document.createTextNode('UBB link (' + link_type + ')'));
	return popup;
}

function popup_about_show()
{
	node = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
			+ '<html><head>'
			+ '<title>About</title>'
			+ '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />'
			+ '<link rel="stylesheet" href="/ubbthreads/stylesheets/template.css" type="text/css" />'
			+ '</head><body>'
			+ '<h1>About: cn_ubb_enhance.user.js</h1>'
			+ '<p>This <a href="https://addons.mozilla.org/en/firefox/addon/748">GreaseMonkey</a> script provides extra functionality when browsing the Cloudy Nights forums with Mozilla Firefox:<p><ul>'
			+ '<li>Add quick context links to single posts when browsing in &lsquo;flat&rsquo; mode.</li>'
			+ '<li>Create the UBB code for inserting a link to a post in a message. Copy the text from the popup and paste it to your message.</li>'
			+ '<li>Highlight NGC, IC and Messier objects and create links to the NGC-IC project in posts.</li>'
			+ '<li>Large images (attached or hotlinked) can be clicked to open them in a separate window.</li>'
			+ '</ul><p><b>Link:</b> <a href="http://shutterfreak.net/xtra/greasemonkey/cn_ubb_enhance/cn_ubb_enhance.user.js">cn_ubb_enhance.user.js</a></p>'
			+ '<p><b>Current version:</b> ' + cn_ubb_enhance_VERSION + '</p>'
			+ '<p><b>Author:</b> Olivier Biot, with contributions from Greg Kettell</p>'
			+ '<p style="text-align:middle"><a href="javascript:self.close()">Close this Window</a></p>' + '</body></html>';
	popup = window.open("", "About", "resizeable,width=400,height=400,status=0,toolbar=0,scrollbars=1");
	popup.document.write(node);
	popup.document.close();
}
/* Usage and version popup.
 */
function popup_about()
{
	var popup = document.createElement('a');
	popup.href = "javascript:void(0)";
	// popup.href='#';
	popup.setAttribute('id', 'popup-cn_ubb_enhance');
	popup.addEventListener('click', function() { popup_about_show(); }, false);
	// Add a link text to the popup link:
	popup.appendChild(document.createTextNode('?'));
	return popup;
}

/* Add links to posts when reading a thread in flat mode.
 */
function add_post_link_in_flat_mode()
{
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		if (links[i].name && links[i].name[0] == '#') {
			// Get the Post ID: it's encoded as an anchor starting with '#'
			// followed with digits representing the post ID (the post number):
			var post_id = links[i].name.slice(1);
			if ( is_numeric(post_id) ) { // Valid Post ID anchor
				// Retrieve the parent element of this link (an HTML Font Element):
				var parent_node = document.getElementsByTagName('a')[i].parentNode;
				parent_node.appendChild(document.createTextNode(' | '));
				// The subject of the post (post title) is contained in the
				// 1st SPAN sibling of this parent:
				var post_subject = parent_node.parentNode.getElementsByTagName('span')[0].innerHTML;

				parent_node.appendChild(document.createElement('br'));
				// Create a link element that will contain the short,
				// quick link to the post in threaded mode:
				parent_node.appendChild(add_ubb_context_link(post_id, 'threaded'));
				i++; // Skip the link we just created */

				// Separator
				parent_node.appendChild(document.createTextNode(' | '));

				// Create a link element that will contain the short,
				// quick link to the post in flat mode:
				parent_node.appendChild(add_ubb_context_link(post_id, 'flat'));
				i++; // Skip the link we just created */

				// Separator
				parent_node.appendChild(document.createTextNode(' | '));

				// Now create a 'UBB link popup' link in threaded context:
				parent_node.appendChild(add_ubb_link_popup(post_id, post_subject, 'threaded'));
				i++; // Skip the link we just created */

				// Separator
				parent_node.appendChild(document.createTextNode(' | '));

				// Now create a 'UBB link popup' link in threaded context:
				parent_node.appendChild(add_ubb_link_popup(post_id, post_subject, 'flat'));
				i++; // Skip the link we just created */

				if (document.getElementById('popup-cn_ubb_enhance') == null) {
					parent_node.appendChild(document.createTextNode(' | '));
					parent_node.appendChild(popup_about());
				}
			}
		}
	}
}


/**
 * Check for new cn_ubb_enhance versions.
 *
 * GM functions can be invoked from GM environment only.
 * This code wasinspired by the Dreditor script for Drupal.
 */
function cn_ubb_enhanceUpdateCheck() {
	if (typeof GM_xmlhttpRequest != 'function') {
		return;
	}
	var version = GM_getValue('version', '');
	var lastChecked = GM_getValue('update.last', 0);
	var now = parseInt(new Date() / 1000, 10);
	// Check every 1 days.
	var interval = 60 * 60 * 24 * 1;
	if (lastChecked - now < -interval) {
		// Whatever happens to this request, remember that we tried.
		GM_setValue('update.last', now);
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://shutterfreak.net/xtra/greasemonkey/cn_ubb_enhance/cn_ubb_enhance.user.js',
			onload: function (responseDetails) {
				if (responseDetails.status == 200) {
					var newversion = responseDetails.responseText.match(/\$Id.+\$/)[0];
					if (newversion == version) {
						return;
					}
					var doUpdate = window.confirm('A new version of cn_ubb_enhance is available.\nCurrent version: '+version+'\nNew version: '+newversion+'\nShall we update?');
					if (doUpdate) {
						window.open('http://shutterfreak.net/xtra/greasemonkey/cn_ubb_enhance/cn_ubb_enhance.user.js', 'dreditor');
						// Let's just assume that we DID update. ;)
						GM_setValue('version', newversion);
					}
				}
			}
		});
	}
}




function main() {
	if ( cn_forum_flat_mode() == true ) {
		add_post_link_in_flat_mode()
	}
	parse_cn_forum_messages();
	cn_ubb_enhanceUpdateCheck();
}


main();
