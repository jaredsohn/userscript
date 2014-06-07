// ==UserScript==
// @name           	Twitter  Helper
// @description    	Adaption/hosting for http://sources.disruptive-innovations.com/twitterHelper/tags/1.01/twitterHelper.jsm for use in GM scripts.
// @author		AubergineAnodyne
// @version		1.01
//
// ==/UserScript==


/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is PlanTwit.
 *
 * The Initial Developer of the Original Code is
 * Pages Jaunes.
 * Portions created by the Initial Developer are Copyright (C) 2008-2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Daniel Glazman <daniel.glazman@disruptive-innovations.com>, Original author
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

//var EXPORTED_SYMBOLS = ["TwitterHelper"];

//if (typeof JSON == "undefined")
//  Components.utils.import("resource://gre/modules/JSON.jsm");

/* CONSTRUCTOR */

function TwitterHelper(aAccount, aPassword, aThrobber, aServiceStr)
{
  this.mAccount = aAccount;
  this.mPassword = aPassword;
  this.mAuthorization = btoa(aAccount + ":" + aPassword);

  this.mThrobber = aThrobber;

  this.mServiceName = aServiceStr;
  switch (aServiceStr)
  {
    case "twitter":
      this.mBaseURL = "http://twitter.com/"; 
      break;
    case "identi.ca":
      this.mBaseURL = "http://identi.ca/api/"; 
      break;
    default:
      throw("TwitterHelper: bad service string");
      break;
  }
  
  this.mDOMParser = new DOMParser();

  this.statuses._self = this;
  this.users._self = this;
  this.direct_messages._self = this;
  this.friendships._self = this;
  this.friends._self = this;
  this.followers._self = this;
  this.account._self = this;
  this.favorites._self = this;
  this.notifications._self = this;
  this.blocks._self = this;
  this.help._self = this;
}

/* PRIVATE */

TwitterHelper.prototype._localizedError =
function(aServiceName, aStringName)
{
  var s = "";
  switch (aStringName)
  {
    case "resp304": s = "Not Modified: there was no new data to return."; break;
    case "resp400": s = "Bad Request: your request is invalid, did you exceed the rate limit?"; break;
    case "resp401": s = "Not Authorized: either you need to provide authentication credentials, or the credentials provided aren't valid."; break;
    case "resp403": s = "Forbidden: access denied to requested data."; break;
    case "resp404": s = "Not Found: either you're requesting an invalid URI or the resource in question doesn't exist (ex: no such user). "; break;
    case "resp500": s = "Internal Server Error"; break;
    case "resp502": s = "Bad Gateway: returned if the service is down or being upgraded."; break;
    case "resp503": s = "Service Unavailable: the servers are up, but are overloaded with requests.  Try again later."; break;

    case "MissingIdParameter": s = "Missing id parameter"; break;
    case "EmptyStatus":        s = "Cannot update with empty status"; break;
    case "EmptyDMRecipient":   s = "Empty recipient for Direct Message"; break;
    case "EmptyDMText":        s = "Empty text for Direct Message"; break;
    case "MissingUserForFriendshipTest": s = "Cannot test friendship because one user parameter is missing"; break;
    case "WrongDevice":        s = "Trying to update unknown device"; break;
    case "NothingToUpdateProfileColors": s = "Nothing to update, all colors are empty"; break;
    default: break;
  }
  
  throw "TwitterError: " + s;
}

TwitterHelper.prototype._onreadystatechangeTwitter =
function(aXmlRequest, aCallback, aErrorCallback, aContext, aTwitterHelper)
{
  if (aXmlRequest.readyState == "4")
  {
    if (this.mThrobber)
      this.mThrobber.setAttribute("hidden", "true");

    // http://apiwiki.twitter.com/REST+API+Documentation#HTTPStatusCodes
    switch(aXmlRequest.status)
    {
      case 200: // OK
        if (aCallback)
        {
          if (aXmlRequest.responseText)
          {
          	var responseXML = this.mDOMParser.parseFromString(aXmlRequest.responseText, 'application/xml');
            aCallback(aTwitterHelper, aXmlRequest.responseXML, aContext);
          }
          else
          {
            try {
              var responseJSON = (JSON.parse ? JSON.parse(aXmlRequest.responseText)
                                             : JSON.fromString(aXmlRequest.responseText));
            }
            catch(e) {
              GM_log("Failed to parse JSON response");
              return;
            }
            aCallback(aTwitterHelper, responseJSON, aContext);
          }
        }
        break;
      case 304: // NOT MODIFIED
      case 400: // BAD REQUEST
      case 401: // NOT AUTHORIZED
      case 403: // FORBIDDEN
      case 404: // NOT FOUND
      case 500: // INTERNAL SERVER ERROR
      case 502: // BAD GATEWAY
      case 503: // SERVICE UNAVAILABLE
        aTwitterHelper._localizedError(aTwitterHelper.mServiceName, "resp" + aXmlRequest.status);
        if (aErrorCallback)
          aErrorCallback(aTwitterHelper, aXMLRequest, aContext);
        break;
      default: break;
    }
  }
}

TwitterHelper.prototype._getXmlRequest =
function(aFeedURL, aCallback, aErrorCallback, aContext, aHeaders)
{
  if (this.mThrobber)
    this.mThrobber.removeAttribute("hidden");
    
  var _self = this;
  
  GM_log("Sending twitter GET to " + aFeedURL);

	GM_xmlhttpRequest({
	  method: 'GET',
	  url: aFeedURL,
	  headers: aHeaders,
	  onreadystatechange: function(responseDetails) {
	    _self._onreadystatechangeTwitter(responseDetails, aCallback, aErrorCallback, aContext, _self);
	  },
  });
}

TwitterHelper.prototype._postXmlRequest =
function(aFeedURL, aCallback, aErrorCallback, aContext, aHeaders)
{
  if (this.mThrobber)
    this.mThrobber.removeAttribute("hidden");
    
  var _self = this;
  
  aHeaders["If-Modified-Since"] = "Sat, 1 Jan 2005 00:00:00 GMT";
  
  GM_log("Sending twitter POST to " + aFeedURL);

	GM_xmlhttpRequest({
	  method: 'POST',
	  url: aFeedURL,
	  headers: aHeaders,
	  onreadystatechange: function(responseDetails) {
			    _self._onreadystatechangeTwitter(responseDetails, aCallback, aErrorCallback, aContext, _self);
	  },
	});
}

TwitterHelper.prototype._sendRequest =
function(aURL, aCallback, aErrorCallback, aAuthenticated, aContext)
{
  var headers = {};
  if (aAuthenticated) {
    headers["Authorization"] = "Basic " + this.mAuthorization;
  }
  var xmlRequest = this._getXmlRequest(aURL, aCallback, aErrorCallback, aContext, headers);
}

TwitterHelper.prototype._sendPostRequest =
function(aURL, aCallback, aErrorCallback, aAuthenticated, aContext)
{
  var headers = {"Content-length": "0"};
	if (aAuthenticated) {
	  headers["Authorization"] = "Basic " + this.mAuthorization;
  }
  this._postXmlRequest(aURL, aCallback, aErrorCallback, aContext, headers);
}

TwitterHelper.prototype._addParamToQueryURL =
function(aURL, aPreCondition, aParam, aStringParam)
{
  var url = aURL;
  if (aParam)
  {
    if (aPreCondition)
      url += "&";
    else
      url += "?";
    url += aStringParam + "=" + escape(aParam.toString().replace( / /g, "+"));
  }
  return url;
}

/* MEMBERS */

TwitterHelper.prototype.statuses        = { };
TwitterHelper.prototype.users           = { };
TwitterHelper.prototype.direct_messages = { };
TwitterHelper.prototype.friendships     = { };
TwitterHelper.prototype.friends         = { };
TwitterHelper.prototype.followers       = { };
TwitterHelper.prototype.account         = { };
TwitterHelper.prototype.favorites       = { };
TwitterHelper.prototype.notifications   = { };
TwitterHelper.prototype.blocks          = { };
TwitterHelper.prototype.help            = { };

/* STATUSES REQUESTS */

TwitterHelper.prototype.statuses.friends_timeline =
function(aCallback, aErrorCallback, aContext, aFormat, aSince, aSinceId, aCount, aPage)
{
  var feedURL = this._self.mBaseURL + "statuses/friends_timeline." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aSince, "since");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince, aSinceId, "since_id");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId, aCount, "count");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId || aCount, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.user_timeline =
function(aCallback, aErrorCallback, aContext, aFormat, aUserId, aSince, aSinceId, aCount, aPage)
{
  var feedURL;
  if (aUserId)
    feedURL = this._self.mBaseURL + "statuses/user_timeline/" + aUserId + "." + aFormat;
  else
    feedURL = this._self.mBaseURL + "statuses/user_timeline." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aSince, "since");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince, aSinceId, "since_id");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId, aCount, "count");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId || aCount, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.friends =
function(aCallback, aErrorCallback, aContext, aFormat, aUserId, aPage)
{
  var feedURL;
  if (aUserId)
    feedURL = this._self.mBaseURL + "statuses/friends/" + aUserId + "." + aFormat;
  else
    feedURL = this._self.mBaseURL + "statuses/friends." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.followers =
function(aCallback, aErrorCallback, aContext, aFormat, aUserId, aPage)
{
  var feedURL;
  if (aUserId)
    feedURL = this._self.mBaseURL + "statuses/followers/" + aUserId + "." + aFormat;
  else
    feedURL = this._self.mBaseURL + "statuses/followers." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.show =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "statuses/show." + aFormat;
  feedURL += "?id=" + aId;

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.replies =
function(aCallback, aErrorCallback, aContext, aFormat, aSince, aSinceId, aPage)
{
  var feedURL = this._self.mBaseURL + "statuses/replies." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aSince, "since");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince, aSinceId, "since_id");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.destroy =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "statuses/destroy/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.statuses.public_timeline =
function(aCallback, aErrorCallback, aContext, aFormat)
{
  var feedURL = this._self.mBaseURL + "statuses/public_timeline." + aFormat;
  this._self._sendRequest(feedURL, aCallback, aErrorCallback, false, aContext);
}

TwitterHelper.prototype.statuses.update =
function(aCallback, aErrorCallback, aContext, aFormat, aText, aInReplyToStatusId, aSource)
{
  if (!aText)
  {
    this._self._localizedError(this._self.mServiceName, "EmptyStatus");
    return;
  }

  var feedURL = this._self.mBaseURL + "statuses/update." + aFormat;
  feedURL += "?status=" + escape(aText);
  feedURL = this._self._addParamToQueryURL(feedURL, true, aInReplyToStatusId, "in_reply_to_status_id");
  feedURL = this._self._addParamToQueryURL(feedURL, true, aSource, "source");

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}


/* USERS REQUESTS */

TwitterHelper.prototype.users.show =
function(aCallback, aErrorCallback, aContext, aFormat, aUserId, aEmail)
{
  if (!aUserId && !aEmail)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL;
  if (!aEmail)
    feedURL = this._self.mBaseURL + "users/show/" + aUserId + "." + aFormat;
  else
  {
    feedURL = this._self.mBaseURL + "users/show." + aFormat;
    feedURL = this._self._addParamToQueryURL(feedURL, false, aEmail, "email");
  }

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* DIRECT_MESSAGES REQUESTS */

TwitterHelper.prototype.direct_messages.inbox =
function(aCallback, aErrorCallback, aContext, aFormat, aSince, aSinceId, aPage)
{
  var feedURL = this._self.mBaseURL + "direct_messages." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aSince, "since");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince, aSinceId, "since_id");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.direct_messages.sent =
function(aCallback, aErrorCallback, aContext, aFormat, aSince, aSinceId, aPage)
{
  var feedURL = this._self.mBaseURL + "direct_messages/sent." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aSince, "since");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince, aSinceId, "since_id");
  feedURL = this._self._addParamToQueryURL(feedURL, aSince || aSinceId, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.direct_messages.new =
function(aCallback, aErrorCallback, aContext, aFormat, aUser, aText)
{
  if (!aUser)
  {
    this._self._localizedError(this._self.mServiceName, "EmptyDMRecipient");
    return;
  }
  if (!aText)
  {
    this._self._localizedError(this._self.mServiceName, "EmptyDMText");
    return;
  }
  var feedURL = this._self.mBaseURL + "direct_messages/new." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aUser, "user");
  feedURL = this._self._addParamToQueryURL(feedURL, true,  aText, "text");

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.direct_messages.destroy =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "direct_messages/destroy/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* FRIENDSHIPS REQUESTS */

TwitterHelper.prototype.friendships.create =
function(aCallback, aErrorCallback, aContext, aFormat, aId, aFollow)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "friendships/create/" + aId + "." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aFollow, "follow");

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.friendships.destroy =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "friendships/destroy/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.friendships.exists =
function(aCallback, aErrorCallback, aContext, aFormat, aUserA, aUserB)
{
  if (!aUserA || !aUserB)
  {
    this._self._localizedError(this._self.mServiceName, "MissingUserForFriendshipTest");
    return;
  }

  var feedURL = this._self.mBaseURL + "friendships/exists." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aUserA, "user_a");
  feedURL = this._self._addParamToQueryURL(feedURL, true,  aUserB, "user_b");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* FRIENDS REQUESTS */

TwitterHelper.prototype.friends.ids =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  var feedURL;
  if (aId)
    feedURL = this._self.mBaseURL + "friends/ids/" + aId + "." + aFormat;
  else
    feedURL = this._self.mBaseURL + "friends/ids." + aFormat;

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* FOLLOWERS REQUESTS */

TwitterHelper.prototype.followers.ids =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  var feedURL;
  if (aId)
    feedURL = this._self.mBaseURL + "followers/ids/" + aId + "." + aFormat;
  else
    feedURL = this._self.mBaseURL + "followers/ids." + aFormat;

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* ACCOUNT REQUESTS */

TwitterHelper.prototype.account.verify_credentials =
function(aCallback, aErrorCallback, aContext, aFormat)
{
  var feedURL = this._self.mBaseURL + "account/verify_credentials." + aFormat;

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.account.end_session =
function(aCallback, aErrorCallback, aContext, aFormat)
{
  var feedURL = this._self.mBaseURL + "account/end_session." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.account.update_delivery_device =
function(aCallback, aErrorCallback, aContext, aFormat, aDevice)
{
  if (aDevice != "sms" && aDevice != "im" && aDevice != "none")
  {
    this._self._localizedError(this._self.mServiceName, "WrongDevice");
    return;
  }
  var feedURL = this._self.mBaseURL + "account/update_delivery_device." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aDevice, "device");

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.account.update_profile_colors =
function(aCallback, aErrorCallback, aContext, aFormat, aBackgroundColor, aTextColor, aLinkColor,
         aSidebarFillColor, aSidebarBorderColor)
{
  if (!aBackgroundColor && !aTextColor && !aLinkColor && !aSidebarFillColor && !aSidebarBorderColor)
  {
    this._self._localizedError(this._self.mServiceName, "NothingToUpdateProfileColors");
    return;
  }

  var feedURL = this._self.mBaseURL + "account/update_profile_colors." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false,
                                     aBackgroundColor, "profile_background_color");
  feedURL = this._self._addParamToQueryURL(feedURL, aBackgroundColor,
                                     aTextColor, "profile_text_color");
  feedURL = this._self._addParamToQueryURL(feedURL, aBackgroundColor || aTextColor,
                                     aLinkColor, "profile_link_color");
  feedURL = this._self._addParamToQueryURL(feedURL, aBackgroundColor || aTextColor || aLinkColor,
                                     aSidebarFillColor, "profile_sidebar_fill_color");
  feedURL = this._self._addParamToQueryURL(feedURL, aBackgroundColor || aTextColor || aLinkColor || aSidebarFillColor,
                                     aSidebarBorderColor, "profile_sidebar_border_color");

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.account.rate_limit_status =
function(aCallback, aErrorCallback, aContext, aFormat)
{
  var feedURL = this._self.mBaseURL + "account/rate_limit_status." + aFormat;

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.account.update_profile =
function(aCallback, aErrorCallback, aContext, aFormat, aName, aEmail, aUrl, aLocation, aDescription)
{
  var feedURL = this._self.mBaseURL + "account/update_profile." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false,
                                     aName, "name");
  feedURL = this._self._addParamToQueryURL(feedURL, aName,
                                     aEmail, "email");
  feedURL = this._self._addParamToQueryURL(feedURL, aName || aEmail,
                                     aUrl, "url");
  feedURL = this._self._addParamToQueryURL(feedURL, aName || aEmail || aUrl,
                                     aLocation, "location");
  feedURL = this._self._addParamToQueryURL(feedURL, aName || aEmail || aUrl || aLocation,
                                     aDescription, "description");

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* FAVORITES REQUESTS */

TwitterHelper.prototype.favorites.favorites =
function(aCallback, aErrorCallback, aContext, aFormat, aUserId, aPage)
{
  var feedURL;
  if (aUserId)
    feedURL = this._self.mBaseURL + "favorites/" + aUserId + "." + aFormat;
  else
    feedURL = this._self.mBaseURL + "favorites." + aFormat;

  feedURL = this._self._addParamToQueryURL(feedURL, false, aPage, "page");

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.favorites.create =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "favorites/create/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.favorites.destroy =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "favorites/destroy/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* NOTIFICATIONS REQUEST */

TwitterHelper.prototype.notifications.follow =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "notifications/follow/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.notifications.leave =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "notifications/leave/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* BLOCKS REQUESTS */

TwitterHelper.prototype.blocks.create =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "blocks/create/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

TwitterHelper.prototype.blocks.destroy =
function(aCallback, aErrorCallback, aContext, aFormat, aId)
{
  if (!aId)
  {
    this._self._localizedError(this._self.mServiceName, "MissingIdParameter");
    return;
  }

  var feedURL = this._self.mBaseURL + "blocks/destroy/" + aId + "." + aFormat;

  this._self._sendPostRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* HELP REQUESTS */

TwitterHelper.prototype.help.test =
function(aCallback, aErrorCallback, aContext, aFormat)
{
  var feedURL = this._self.mBaseURL + "help/test." + aFormat;

  this._self._sendRequest(feedURL, aCallback, aErrorCallback, true, aContext);
}

/* UTILITIES */

TwitterHelper.prototype.isMention =
function(aText)
{
  var matches = aText.match( /(@\w*)/g );

  for (var i = 0; i < matches.length; i++)
    if (matches[i] == "@" + this.mAccount)
      return true;
  return false;    
}
