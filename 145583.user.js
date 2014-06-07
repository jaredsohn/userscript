// ==UserScript==
// @name           Calvin Autologin
// @namespace      http://userscripts.org/users/484734
// @description    Automatically log into Portal, Moodle, and login.pl (people search) at Calvin College.
// @icon           http://cdn.ohnopub.net/cdn/binki/images/calvinsso_icon.png
// @include        https://moodle.calvin.edu/login/*
// @include        http://moodle.calvin.edu/mod/forum*
// @include        https://portal.calvin.edu/CookieAuth.dll*
// @include        https://www.calvin.edu/cgi-bin/auth/login.pl*
// @include        https://webprint.calvin.edu*
// @include        https://ulysses.calvin.edu/opac/*myopac.xml*
// @include        https://lib-proxy.calvin.edu/login*
// @grant          none
// @version        0.4.3
// ==/UserScript==

/**
 * \brief
 *   Add an onload function.
 */
function document_onload(f)
{
    /* proxy pattern… */
    var oldonload = window.onload || function() {};
    window.onload = function() {
	f.call(window);
	oldonload.call(window);
    }
}

if (document.URL.indexOf('https://portal.calvin.edu/CookieAuth.dll') === 0)
{
    document_onload(function() {
	/* Enable password saving. */
	var logonForm = document.getElementById('logonForm');
	logonForm.removeAttribute('autocomplete');

	/* Enable session persistence. */
	document.getElementById('rdoPrvt').checked = true;

	/* 
	 * If a password is entered _and_ we haven't arrived from an
	 * unsuccessful login, trigger a login automatically.
	 */
	if (document.getElementById('password').value.length
	    && (document.referrer === undefined || document.referrer.indexOf('https://portal.calvin.edu/CookieAuth.dll') !== 0))
	    logonForm.submit();
    });
}

if (document.URL.indexOf('https://moodle.calvin.edu/login') === 0)
{
    var escapeddest = null;
    if (escapeddest === null && window.location.search !== null)
	/*
	 * This whole block of code doesn’t appear to make sense with
	 * out moodle works… it uses wantsurl= instead of destination=
	 * and, when wantsurl= is specified, the server will redirect
	 * us and store the wantsurl= version in the $_SESSION instead
	 * of handing it to us. We rely on a hack of extracting the
	 * wantsurl= from the Mahara login link in the next if
	 * statement.
	 */
    {
	if (window.location.search.indexOf('&destination=') > -1)
	    escapeddest = encodeURIComponent(window.location.search.split('&destination=')[1].split('&')[0]);
	else if (window.location.search.indexOf('?destination=') > -1)
	    escapeddest = encodeURIComponent(window.location.search.split('?destination=')[1].split('&')[0]);
    }
    /*
     * Currently, just use the portal SSO method. No point in saving
     * your password into Mozilla Sync on more than one calvin URI.
     */
    if (true)
    {
	document_onload(function() {
	    if (escapeddest === null)
	    {
		var maharaextlogin = document.evaluate("//div[contains(concat(' ', @class, ' '), ' potentialidp ')]//a[contains(@href, '/mahara') and contains(@href, '&wantsurl=')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
		if (maharaextlogin !== null && maharaextlogin !== undefined)
		    escapeddest = maharaextlogin.getAttribute('href').split('&wantsurl=')[1].split('&')[0];
	    }

	    var a = document.createElement('a');
	    /*
	     * Construct a URI like
	     * https://portal.calvin.edu/_layouts/Datatel/SSO/MoodleSSOCalvin.aspx?ead=MoodleSSO&action=https%3a%2f%2fmoodle.calvin.edu%2flogin%2findex.php&destination=http%3a%2f%2fmoodle.calvin.edu%2fcourse%2fview.php%3fid%3d19531&error=https%3a%2f%2fportal.calvin.edu%2f_layouts%2fDatatel%2fSSO%2fMoodleSSORedirectCalvin.aspx
	     */
	    a.setAttribute('href', 'https://portal.calvin.edu/_layouts/Datatel/SSO/MoodleSSOCalvin.aspx?ead=MoodleSSO&action=' + encodeURIComponent('https://moodle.calvin.edu/login/index.php') + '&destination=' + escapeddest + '&error=https%3a%2f%2fportal.calvin.edu%2f_layouts%2fDatatel%2fSSO%2fMoodleSSORedirectCalvin.aspx');
	    document.getElementsByTagName('body')[0].appendChild(a);

	    /* Ensure that remembering the username is set. */
	    document.getElementById('rememberusername').checked = true;

	    /*
	     * Somehow, using location.href = does not cause the
	     * password to be properly autofilled a portal.calvin.edu
	     * while ``clicking'' does somehow. Also, the click is
	     * performed from within the onload() otherwise Mozilla
	     * does not autofill the form at portal. I.e., the same
	     * problem can be caused by any number of complementary
	     * methods ;-).
	     */
	    if (a.click)
		a.click();
	    else
		/* Old versions of chromium don't implement HTMLElement.click() */
		window.location.href = a.href;

	    /* (proxy pattern) */
	    if (oldonload !== undefined && oldonload !== null)
		oldonload.call(document);
	});
    }
    else
    {
	var oldonload = window.onload;
	/*
	 * Alternate for if the Moodle page should have its own
	 * password entry. Maybe there should be some greasemonkey UI
	 * to en/disabled this because it's just hard-disabled for
	 * now.
	 */
	window.onload = function() {
	    /*
	     * If a password is enterred _and_ we haven't arrive from
	     * an unsuccessful login, trigger a login automatically.
	     */
	    if (document.getElementById('password').value.length
		&& (document.referrer === undefined || document.referrer.indexOf('https://moodle.calvin.edu/login') !== 0))
		document.getElementById('login').submit();

	    /* (proxy pattern) */
	    if (oldonload !== undefined && oldonload !== null)
		oldonload.call(document);
	}
    }
}

/*
 * For the “Sorry, guests are not allowed to post. Would you like to
 * log in now with a full user account?” which shows up when you’re on
 * a forum posting page and lose your session.
 */
if (document.URL.indexOf('http://moodle.calvin.edu/') === 0)
    document_onload(function() {
	var notice_element = document.getElementById('notice');
	if (notice_element
	    && notice_element.firstChild /* <div id="notice"><p/></div> */
	    && notice_element.firstChild.firstChild /* the <p/>’s #text node */
	    && notice_element.firstChild.firstChild.data /* if it is a text node */)
	{
	    var text = notice_element.firstChild.firstChild.data;
	    if (text.indexOf('guests are not allowed') !== -1)
	    {
		/* Then look for and click the “Continue” button */
		var forum_login_continue_element = document.evaluate('//input[@type = "submit" and @value = "Continue"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
		if (forum_login_continue_element
		    && forum_login_continue_element.click)
		    forum_login_continue_element.click();
	    }
	}
    });

if (document.URL.indexOf('https://www.calvin.edu/cgi-bin/auth/login.pl') === 0)
{
    /* 
     * Prefer the referrer as it functions better than redirecting
     * back to the login.pl script (actually, I appear to be wrong
     * about needing referrer... but better leave it commented out
     * than deleted ;-)). Add cache-breakers so that logging in on
     * people.pl doesn't return the cached copy which asks the user,
     * who is now logged in, ~``Do you want to log in?''
     */
    var nexturi = /*document.referrer ||*/ document.URL;
    var getsep = '?';
    if (nexturi.indexOf('?') !== -1)
	getsep = '&';
    nexturi += getsep + '__anticache=' + Math.random();

    document_onload(function() {
	/*
	 * If the page has <div class="alert">The service you
	 * requested has additional security measures.</div> and only
	 * has an <input/> for the password, with the <input/> for the
	 * username replaced by <strong>username</strong>, then the
	 * user is being forced to re-verify his password and logging
	 * in through portal again just gets us into a loop. Thus, we
	 * don’t redirect for those cases. This is necessary to
	 * support the password-changing page.
	 */
	if (document.evaluate('//input[@name="u"]', document, null, XPathResult.ANY_TYPE, null).iterateNext() != null)
	{
	    /* Found a username input field, we should portal. */
	    /*
	     * The SSO stuff is silly and doesn't parse the query
	     * string correctly, stopping after the first ampersand
	     * instead of skipping over it because it's encoded
	     * already. Thus the double-escape for dst=. See
	     * http://hg.ohnopub.net/hg/creep/file/f9ecb10106e4/index.php#l66
	     * for the equivalent PHP code.
	     */
	    window.location.href = 'https://portal.calvin.edu/_layouts/CalvinSSO/kv2ww.aspx?url=' + encodeURIComponent('https://www.calvin.edu/cgi-bin/login_portal.pl?dst=' + encodeURIComponent(encodeURIComponent(nexturi)));
	}
    });
}

if (document.URL.indexOf('https://webprint.calvin.edu') === 0 && document.URL.indexOf('/user') > -1)
{
    /*
     * Disable autocomplete="off"
     */
    document.evaluate('//form[@autocomplete]', document, null, XPathResult.ANY_TYPE, null).iterateNext().removeAttribute('autocomplete');

    /* proxy pattern... */
    var oldonload = window.onload || function() {};
    window.onload = function() {
	var inputPassword = document.getElementById('inputPassword');
	if (inputPassword != null && inputPassword.value.length)
	{
	    for (var form = inputPassword.parentNode;
		 form != null;
		 form = form.parentNode)
		if (form.tagName !== undefined && form.tagName.toLowerCase() === 'form')
		    form.submit();
	}
	oldonload.call(window);
    }
}

if (document.URL.indexOf('https://ulysses.calvin.edu/opac') === 0)
{
    /* proxy pattern… */
    var oldonload = window.onload || function() {};
    window.onload = function() {
	var username_dest = document.getElementById('username_dest');
	if (username_dest != null)
	    username_dest.normalize();
	if (username_dest != null && username_dest.firstChild != null
	    && username_dest.firstChild.data != null && !username_dest.firstChild.data.trim().length /* no length means not logged in */)
	{
	    var login_password = document.getElementById('login_password');
	    if (login_password != null && login_password.value.length)
	    {
		for (var form = login_password.parentNode;
		     form != null;
		     form = form.parentNode)
		{
		    if (form.tagName !== undefined && form.tagName.toLowerCase() === 'form')
		    {
			form.submit();
			break;
		    }
		}
	    }
	}

	oldonload.call(window);
    }
}

if (document.URL.indexOf('https://lib-proxy.calvin.edu/login') === 0)
{
    document_onload(function() {
	var input_user_element = document.evaluate('//input[@name="user"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (input_user_element != null
	    && input_user_element.value != null
	    && input_user_element.value.length)
	{
	    var input_pass_element = document.evaluate('//input[@name="pass"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	    if (input_pass_element != null
		&& input_pass_element.value != null
		&& input_pass_element.value.length)
	    {
		var form_element = document.evaluate('ancestor::form', input_pass_element, null, XPathResult.ANY_TYPE, null).iterateNext();
		if (form_element
		   && form_element.submit)
		{
		    form_element.submit();
		}
	    }
	}
    });
}
