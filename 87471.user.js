/*
// Copyright (c) 2010 ilcapone

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
*/

scr_meta=<><![CDATA[
// ==UserScript==
// @name          CoZone-Script
// @description   Script for forum board
// @include       http://*managerzone.com*
// @exclude       http://*managerzone.com*/iframes/*
// @exclude       http://*managerzone.com*/ajax_com/*
// @exclude       http://dynamic.managerzone.com*
// @exclude       http://static.managerzone.com*
// @version       4.3.2
// @author        ilcapone
// @info          http://carapachin.puertadigital.com/blog/page/CoZone-Script.aspx
// @license       MIT License
// @resource      LoadingImage http://i45.tinypic.com/am8wwi.gif
// @resource      PreviewWatermark http://i49.tinypic.com/14tsxly.jpg
// @resource      FriendlyleagueDisabled http://i50.tinypic.com/k1rodi.jpg
// @resource      LeagueDisabled http://i47.tinypic.com/28chs12.jpg
// @resource      MatchesDisabled http://i48.tinypic.com/2s13sed.jpg
// @resource      icon_ButtonForumOut http://i50.tinypic.com/dfd01l.jpg
// @resource      icon_ButtonForumOver http://i47.tinypic.com/4qssh.jpg
// @resource      icon_ButtonTacticsOut http://i45.tinypic.com/e0laja.jpg
// @resource      icon_ButtonTacticsOver http://i50.tinypic.com/2j1sqy8.jpg
// @resource      icon_ButtonTrainingReportOut http://i48.tinypic.com/2u8kq9y.jpg
// @resource      icon_ButtonTrainingReportOver http://i48.tinypic.com/2502p6w.jpg
// @resource      icon_ButtonTransfersMonitoringOut http://i48.tinypic.com/2dt6elz.jpg
// @resource      icon_ButtonTransfersMonitoringOver http://i48.tinypic.com/5xtrfs.jpg
// @resource      icon_ButtonInjuredSuspendedOut http://i45.tinypic.com/zntvcw.jpg
// @resource      icon_ButtonInjuredSuspendedOver http://i50.tinypic.com/pvs48.jpg
// @resource      icon_ButtonQuoteOut http://i48.tinypic.com/2e3s4r4.jpg
// @resource      icon_ButtonQuoteOver http://i46.tinypic.com/i1a1yc.jpg
// @resource      icon_ButtonLinkOut http://i49.tinypic.com/jk7qlj.jpg
// @resource      icon_ButtonLinkOver http://i48.tinypic.com/n4jp1g.jpg
// @resource      icon_ButtonLeagueOut http://i45.tinypic.com/179vub.jpg
// @resource      icon_ButtonLeagueOver http://i48.tinypic.com/k2k6lv.jpg
// @resource      icon_ButtonMatchNextInOut http://i47.tinypic.com/116qt7k.jpg
// @resource      icon_ButtonMatchNextInOver http://i47.tinypic.com/10ct6yf.jpg
// @resource      icon_ButtonMatchPlayedInOut http://i45.tinypic.com/16m2k1.jpg
// @resource      icon_ButtonMatchPlayedInOver http://i48.tinypic.com/2jcy739.jpg
// @resource      icon_ButtonMatchPlayedOut http://i47.tinypic.com/14tr3fr.jpg
// @resource      icon_ButtonMatchPlayedOver http://i49.tinypic.com/2afy1q1.jpg
// @resource      icon_ButtonMatchNextOut http://i45.tinypic.com/5x4jr4.jpg
// @resource      icon_ButtonMatchNextOver http://i45.tinypic.com/2u6mbo1.jpg
// @resource      icon_ButtonPlusOut http://i45.tinypic.com/14tolle.jpg
// @resource      icon_ButtonPlusOver http://i50.tinypic.com/2uzezpz.jpg
// @resource      icon_ButtonCancelOut http://i46.tinypic.com/23sdcph.jpg
// @resource      icon_ButtonCancelOver http://i50.tinypic.com/2enw0g0.jpg
// @resource      icon_ButtonFriendlyLeagueOut http://i48.tinypic.com/2qk5x5t.png
// @resource      icon_ButtonFriendlyLeagueOver http://i47.tinypic.com/34dmvd0.png
// @resource      icon_ButtonNewsOut http://i45.tinypic.com/zbhxw.jpg
// @resource      icon_ButtonNewsOver http://i48.tinypic.com/291chg4.jpg
// @resource      icon_ButtonBoldOut http://i46.tinypic.com/li6mw.jpg
// @resource      icon_ButtonBoldOver http://i47.tinypic.com/j9mz53.jpg
// @resource      icon_ButtonItalicOut http://i49.tinypic.com/6f73t2.jpg
// @resource      icon_ButtonItalicOver http://i45.tinypic.com/71l1l3.jpg
// @resource      icon_ButtonUnderlineOut http://i48.tinypic.com/2wlxdmt.jpg
// @resource      icon_ButtonUnderlineOver http://i46.tinypic.com/1238ep1.jpg
// @resource      icon_ButtonImageOut http://i50.tinypic.com/125s2op.jpg
// @resource      icon_ButtonImageOver http://i47.tinypic.com/9sgz2o.jpg
// @resource      icon_ButtonImageLoadOut http://i49.tinypic.com/2m51h20.jpg
// @resource      icon_ButtonImageLoadOver http://i50.tinypic.com/aepnjm.jpg
// @resource      icon_ButtonPreviewOut http://i48.tinypic.com/20gcnk2.jpg
// @resource      icon_ButtonPreviewOver http://i48.tinypic.com/rgwfir.jpg
// @resource      icon_ButtonPlayersOut http://i46.tinypic.com/2r6ipus.jpg
// @resource      icon_ButtonPlayersOver http://i45.tinypic.com/mtnzhy.jpg
// @resource      icon_ButtonTrainingFieldOut http://i46.tinypic.com/34jegyv.jpg
// @resource      icon_ButtonTrainingFieldOver http://i50.tinypic.com/14e9yz5.jpg
// @resource      icon_ButtonChallengeOut http://i46.tinypic.com/2gudzz6.jpg
// @resource      icon_ButtonChallengeOver http://i45.tinypic.com/wqy45v.jpg
// @resource      icon_ButtonGuestbookOut http://i45.tinypic.com/i50rdi.jpg
// @resource      icon_ButtonGuestbookOver http://i46.tinypic.com/2u4uecj.jpg
// @resource      icon_ButtonTopScorerOut http://i46.tinypic.com/de1kyb.jpg
// @resource      icon_ButtonTopScorerOver http://i50.tinypic.com/2n9x75k.jpg
// @resource      icon_ButtonSkinOut http://i50.tinypic.com/33ber1t.jpg
// @resource      icon_ButtonSkinOver http://i50.tinypic.com/kb3x9k.jpg
// @thanks        http://www.mzplus.com.ar
// @thanks        Federacion Season 23 Argentina
// ==/UserScript==
]]></>.toString();

var CoZone = {
// Properties
  userscriptsId : '77979',
  waitUpdateCheck : 240,
  currentVersionScript : /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
  lastzIndex : 0,
  locationOnSite : null,
  managers : new Array(),
  sortManagerFor : null,
  sport : null,
  sport_id : null,

// Methods
  execute : function()
  {
    this.setLocationOnSite();
    if (this.locationOnSite != null)
    {
      this.setSport();
      CoZone.Skin.init();
      CoZone.Locale.init();
      CoZone.ManagerTB.show();
      //CoZone.ManagerTB.showUpdateScript();
      CoZone.ManagerTB.checkUpdateScript();
      CoZone.BuddyTB.show();
     if (this.locationOnSite == 'forumtopics')
        CoZone.ForumTopics.execute();
      else if (this.locationOnSite == 'topicboard')
        CoZone.TopicBoard.execute();
      else if (this.locationOnSite == 'guestbook')
        CoZone.GuestbookBoard.execute();
      else if (this.locationOnSite == 'leagueboard')
        CoZone.LeagueBoard.execute();
      document.addEventListener("click", CoZone.dispatchClick, false);
    };
  },
  setSport : function()
  {
    var logoStyle = getComputedStyle(document.getElementById('mz_logo'), null);
    if (logoStyle.backgroundImage.search(/soccer/i) == -1)
    {
      this.sport = 'hockey';
      this.sport_id = 2;
    }  
    else
    {
      this.sport = 'soccer';
      this.sport_id = 1;
    }
  },
  getToolbarButtonImg : function(imgRes, id, title)
  {
    return ('<img id="'+id+'" alt="" title="'+ title +'" style="margin: 0px 1px 0px 1px;cursor:pointer;" src="'+CoZone.Skin.resourceURL(imgRes+'Out')+'" onmouseover="this.src = \''+CoZone.Skin.resourceURL(imgRes+'Over')+'\';" onmouseout="this.src = \''+CoZone.Skin.resourceURL(imgRes+'Out')+'\';" />');
  },
  getToolbarButtonImgAction : function(imgRes, action, title)
  {
    return ('<img alt="" title="'+ title +'" onclick="'+ action +'" style="margin: 0px 1px 0px 1px;cursor:pointer;" src="'+CoZone.Skin.resourceURL(imgRes+'Out')+'" onmouseover="this.src = \''+CoZone.Skin.resourceURL(imgRes+'Over')+'\';" onmouseout="this.src = \''+CoZone.Skin.resourceURL(imgRes+'Out')+'\';" />');
  },
  getToolbarButtonImgOut : function(imgRes, link, title)
  {
    return ('<a href="'+link+'"><img alt="" title="'+ title +'" border=0 style="margin: 0px 1px 0px 1px;" src="'+CoZone.Skin.resourceURL(imgRes+'Out')+'" onmouseover="this.src = \''+CoZone.Skin.resourceURL(imgRes+'Over')+'\';" onmouseout="this.src = \''+CoZone.Skin.resourceURL(imgRes+'Out')+'\';" /></a>');
  },
  getToolbarButtonIn : function(caption, uniqueAction, title)
  {
    return ('<span style="line-height:0px;font-size:12px;color:silver;text-decoration:none;">&#171;</span><span id="'+uniqueAction+'" title="'+title+'" onmouseover="this.style.color=\'lime\';" onmouseout="this.style.color=\'yellow\';" style="line-height:0px;font-size:12px;font-weight:bold;color:yellow;text-decoration:none;cursor:pointer;">'+caption+'</span><span style="line-height:0px;font-size:12px;color:silver;text-decoration:none;">&#187;</span>');
  },
  getToolbarButtonOut : function(caption, href, title)
  {
    return ('<span style="line-height:0px;font-size:12px;color:silver;text-decoration:none;">&#171;</span><a title="'+title+'" href="'+href+'" onmouseover="this.style.color=\'cyan\';" onmouseout="this.style.color=\'yellow\';" style="line-height:0px;font-size:12px;font-weight:bold;color:yellow;text-decoration:none;cursor:pointer;">'+caption+'</a><span style="line-height:0px;font-size:12px;color:silver;text-decoration:none;">&#187;</span>');  
  },
  httpRequest : function (url, context, callback, params) {
    function responseHttpRequest(response) {
      if (params == null)
      {
        params = new Array();
      }
      params.push(response);
      callback.apply(context, params);
    };
    GM_xmlhttpRequest({
      method : "GET",
      url : url,
      onload : responseHttpRequest,
      onerror : responseHttpRequest
    } );
  },
  getContentMatch : function (managerData)
  {
    var imageHtml;
    if (CoZone.sport_id == 1)
      imageHtml = '<img src="http://www.mzplus.com.ar/imgdin_part?user='+ managerData.name +'&cantpart=5" width=400px height=144px />'
    else
      imageHtml = '<div style="width:400px;height:144px;background-image:url('+GM_getResourceURL('MatchesDisabled')+');"><br /><span style="-moz-border-radius-bottomright:10px;-moz-border-radius-topright:10px;background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';opacity:0.6;padding:5px 10px;">'+CoZone.Locale.str('only_soccer')+'</span></div>';
    return ( 
      '<div style="text-align:right;padding-right:2px;">' + CoZone.getHtmlManagerTB(managerData.name, managerData.id, managerData) + 
      '</div>' + imageHtml
    );
  },
  getContentSerie : function (managerData)
  {
    var imageHtml;
    if (CoZone.sport_id == 1)
      imageHtml = '<img src="http://www.mzplus.com.ar/imgdin_liga?user='+ managerData.name +'" width=400 height=146 />'
    else
      imageHtml = '<div style="width:400px;height:146px;background-image:url('+GM_getResourceURL('LeagueDisabled')+');"><br /><span style="-moz-border-radius-bottomright:10px;-moz-border-radius-topright:10px;background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';opacity:0.6;padding:5px 10px;">'+CoZone.Locale.str('only_soccer')+'</span></div>';
    return (
      '<div style="text-align:right;padding-right:2px;">' + CoZone.getHtmlManagerTB(managerData.name, managerData.id, managerData) + 
      '</div>' + imageHtml
    );
  },
  findManagerByName : function (managerName) {
    var managerData = null;
    var i = 0;
    this.sortManagersByName();
    while ((i < this.managers.length) && (managerData == null))
    {
      if (this.managers[i].name == managerName)
      {
        managerData = this.managers[i];  
      }
      else
      {
        if (this.managers[i].name < managerName)
        {
          i++;      
        }
        else
        {
          i = this.managers.length;
        }
      }
    };
    return managerData;
  },
  findManagerById : function (managerId) {
    var managerData = null;
    var i = 0;
    while ((i < this.managers.length) && (managerData == null))
    {
      if (this.managers[i].id == managerId)
      {
        managerData = this.managers[i];  
      }
      else
      {
        i++;      
      }
    };
    return managerData;
  },
  sortManagersBySerie : function () {
    if (this.sortManagerFor != 'serie')
    {
      this.managers.sort(
        function(i1, i2)
        {
          var div1 = i1.seriesName.slice(3, i1.seriesName.indexOf('.', 4));
          var div2 = i2.seriesName.slice(3, i2.seriesName.indexOf('.', 4));
          var retVal = CoZone.compareValue(parseInt(div1[0]), parseInt(div2[0]));
          if (retVal == 0) 
          {
            retVal = CoZone.compareValue(i1.name, i2.name);;
          };
          return retVal; 
        } );
      this.sortManagerFor = 'serie';
    }
  },
  sortManagersByName : function () {
    if (this.sortManagerFor != 'name')
    {
      this.managers.sort(
        function(i1, i2)
        {
          return CoZone.compareValue(i1.name, i2.name); 
        } );
      this.sortManagerFor = 'name';
    }
  },
  removeHTMLTags : function (html) {
    html = html.replace(/&(lt|gt);/g, function (strMatch, p1){
      return (p1 == "lt")? "<" : ">";
    });
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  },
  ltrim : function (str) {
   return str.replace(/^\s+/, '');
  },
  rtrim : function (str) {
    return str.replace(/\s+$/, '');
  },
  alltrim : function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  },
  getHtmlManagerTB : function (managerName, managerId, managerData) {
    var htmlTB = '';
    if (managerData == null)
    {
      if ((managerId != undefined) && (managerId != null))
      {
        htmlTB =
          '<div class="cozone_skin_toolbar" style="float:right;">' +
          CoZone.getToolbarButtonImgOut('ButtonGuestbook', '/?p=guestbook&uid='+ managerId, CoZone.Locale.str('guestbook')) +
          '</div>' +
          '<div style="font-size:12px;padding-top:2px;font-weight:bold;float:right;color:white;">'+ managerName +'&nbsp;</div><br/>';
      }
      else
      {
        htmlTB = '<div style="font-size:12px;padding-top:2px;font-weight:bold;float:right;color:white;">'+ managerName +'&nbsp;</div><br/>';
      }
    }
    else
    {
      htmlTB =
        '<div class="cozone_skin_toolbar" style="float:right;">' +
        CoZone.getToolbarButtonImgOut('ButtonLeague', '/?p=series&sid='+ managerData.seriesId +'&tid='+ managerData.teamId, CoZone.Locale.str('league')) +
        CoZone.getToolbarButtonImgOut('ButtonPlayers', '/?p=players&sub=alt&tid='+ managerData.teamId, CoZone.Locale.str('players')) +
        CoZone.getToolbarButtonImgOut('ButtonMatchPlayed', '/?p=match&sub=played&tid='+ managerData.teamId, CoZone.Locale.str('played_matches_results')) +
        CoZone.getToolbarButtonImgOut('ButtonMatchNext', '/?p=match&sub=scheduled&tid='+ managerData.teamId, CoZone.Locale.str('upcoming_matches')) +
        CoZone.getToolbarButtonImgOut('ButtonChallenge', '/?p=team&sub=challenge&tid='+ managerData.teamId, CoZone.Locale.str('challenge')) +
        CoZone.getToolbarButtonImgOut('ButtonGuestbook', '/?p=guestbook&uid='+ managerData.id, CoZone.Locale.str('guestbook')) +
        '</div>' +
        '<div style="font-size:12px;font-weight:bold;padding-top:2px;float:right;color:white;">'+ managerData.name +'&nbsp;|&nbsp;'+ managerData.teamName +'&nbsp;</div><br/>';
    }
    return htmlTB;
  },
  setLocationOnSite : function() 
  {
    var path = window.location.href;
    this.locationOnSite = null;
    if ( (path.search(/managerzone.com/i) != -1) &&
         (path.search(/\/iframes\//i) == -1) &&
         (path.search(/\/ajax_com\//i) == -1) &&
         (path.search(/\/dynamic.managerzone.com\//i) == -1) &&
         (path.search(/\/static.managerzone.com\//i) == -1) &&
         (document.getElementById('logout_etc') != null) )
    {
      this.locationOnSite = 'another';
      if (path.search(/sub=topics/i) != -1)
        this.locationOnSite = 'forumtopics';
      else if (path.search(/topic_id=/i) != -1)
        this.locationOnSite = 'topicboard';
      else if (path.search(/p=guestbook/i) != -1)
        this.locationOnSite = 'guestbook';
      else if (path.search(/sub=board/i) != -1)
        this.locationOnSite = 'leagueboard';
    }
  },
  getDivTitleBar : function (divName, title) {
    return (
      '<div style="background-color:gray;font-weight:bold;height:16px;"><div style="float:left;">' +
      CoZone.getToolbarButtonImgAction('ButtonCancel', 'document.getElementById(\''+ divName +'\').style.display = \'none\';', CoZone.Locale.str('close')) +
      '</div><div id="'+ divName +'-title" style="color:white;float:left;font-size:12px;font-weight:bold;margin:0px 0px 0px 4px">'+ (((typeof title) == 'string') ? title : '&nbsp;') +'</div></div>'
    )
  },
  parseXMLFromString : function (strXml) {
    if (typeof strXml == 'string') {
      var domXml = new DOMParser(); 
      return domXml.parseFromString(strXml, "application/xml");
    }
    else {
      return null;
    }
  },
  responseNextMatchList : function (divManagerInfo, divManagerContent, X, Y, managerData, response) {
    if (response.status == 200) 
    {
      managerData.nextMatches = CoZone.parseXMLFromString(response.responseText).getElementsByTagName('Match');
      CoZone.generateMatchList(divManagerInfo, divManagerContent, X, Y, managerData, managerData.nextMatches);
    }
    else
    {
      CoZone.hideLoading();
    }
  },
  responseMatchList : function (divManagerInfo, divManagerContent, X, Y, managerData, response) {
    if (response.status == 200) 
    {
      managerData.playedMatches = CoZone.parseXMLFromString(response.responseText).getElementsByTagName('Match');
      CoZone.generateMatchList(divManagerInfo, divManagerContent, X, Y, managerData, managerData.playedMatches);
    }
    else
    {
      CoZone.hideLoading();
    }
  },
  showManagerPlayedMatches : function (managerName, managerId, divManagerInfo, X, Y, managerData) {
    var divManagerContent = document.getElementById('cozone_divManagerContent');
    var divManagerTB = document.getElementById('cozone_divManagerTB');
    var divTitle = document.getElementById('cozone_divManagerInfo-title');
    divTitle.innerHTML = CoZone.Locale.str('played_matches_of') + ' ' + managerName;
    divManagerTB.innerHTML = CoZone.getHtmlManagerTB(managerName, managerId, managerData);
    divManagerContent.innerHTML = '';
    if (managerData == null)
    {
      if (CoZone.sport_id == 1)
        divManagerContent.innerHTML = '<img src="http://www.mzplus.com.ar/imgdin_part?user='+ managerName +'&cantpart=5" width=400 height=144 />'
      else
        divManagerContent.innerHTML = '<div style="width:400px;height:144px;background-image:url('+GM_getResourceURL('MatchesDisabled')+');"><br /><span style="-moz-border-radius-bottomright:10px;-moz-border-radius-topright:10px;background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';opacity:0.6;padding:5px 10px;">'+CoZone.Locale.str('only_soccer')+'</span></div>';
    }
    else
    {
      CoZone.showLoading(X, Y);
      if (managerData.playedMatches == null)
      {
        CoZone.httpRequest(
          '/xml/team_matchlist.php?sport_id='+CoZone.sport_id+'&team_id='+managerData.teamId+'&match_status=1&limit=12',
          this,
          this.responseMatchList,
          [divManagerInfo, divManagerContent, X, Y, managerData] );
      }
      else
      {
        CoZone.generateMatchList(divManagerInfo, divManagerContent, X, Y, managerData, managerData.playedMatches);
      };
    }
  },
  showManagerNextMatches : function (managerName, managerId, divManagerInfo, X, Y, managerData) {
    var divManagerContent = document.getElementById('cozone_divManagerContent');
    var divManagerTB = document.getElementById('cozone_divManagerTB');
    var divTitle = document.getElementById('cozone_divManagerInfo-title');
    divTitle.innerHTML = CoZone.Locale.str('upcoming_matches_of') + ' ' + managerName;
    divManagerTB.innerHTML = CoZone.getHtmlManagerTB(managerName, managerId, managerData);
    divManagerContent.innerHTML = '';
    if (managerData != null)
    {
      CoZone.showLoading(X, Y);
      if (managerData.nextMatches == null)
      {
        CoZone.httpRequest(
          '/xml/team_matchlist.php?sport_id='+CoZone.sport_id+'&team_id='+managerData.teamId+'&match_status=2&limit=12',
          this,
          this.responseNextMatchList,
          [divManagerInfo, divManagerContent, X, Y, managerData] );
      }
      else
      {
        CoZone.generateMatchList(divManagerInfo, divManagerContent, X, Y, managerData, managerData.nextMatches);
      };
    };
  },
  generateMatchList : function (divManagerInfo, divManagerContent, X, Y, managerData, matches) {
    var htmlMatches = '';
    var typeMatch;
    var htmlTypeMatch;
    var linkTypeMatch;
    var teams;
    var homeTeams;
    var awayTeams;
    var homeHtml;
    var awayHtml;
    var match;
    for (var i = 0; i < matches.length; i++)
    {
      match = matches[i];
      typeMatch = match.getAttribute('type');
      htmlTypeMatch =
          (typeMatch.search(/private_cup/i) == 0) ? 'CP: ' + match.getAttribute('typeName') :
          (typeMatch == 'league') ? CoZone.Locale.str('league') :
          (typeMatch == 'friendly_series') ? CoZone.Locale.str('fl') + ': ' + match.getAttribute('typeName') :
          (typeMatch == 'friendly') ? CoZone.Locale.str('friendly') :
          (typeMatch.search(/cup/i) == 0) ? CoZone.Locale.str('cup') + ': ' + match.getAttribute('typeName') : 
          typeMatch;
      linkTypeMatch =
        (typeMatch == 'cup_group') ? '/?p=cup&sub=info&cid=' + match.getAttribute('typeId') + '&sub=groupplay&tid=' + managerData.teamId : 
        (typeMatch == 'cup_playoff') ? '/?p=cup&sub=info&cid=' + match.getAttribute('typeId') + '&sub=schedule&tid=' + managerData.teamId : 
        (typeMatch == 'league') ? ((managerData == null) ? null : '/?p=series&sid='+ managerData.seriesId +'&tid='+ managerData.teamId) :
        (typeMatch == 'friendly_series') ? '/?p=friendlyseries&sub=standings&fsid=' + match.getAttribute('typeId') : 
        (typeMatch == 'private_cup_playoff') ? '/?p=private_cup&sub=info&cid=' + match.getAttribute('typeId') + '&sub=schedule&tid=' + managerData.teamId : 
        (typeMatch == 'private_cup_group') ? '/?p=private_cup&sub=info&cid=' + match.getAttribute('typeId') + '&sub=groupplay&tid=' + managerData.teamId : 
        null;
      teams = match.getElementsByTagName('Team');
      if (linkTypeMatch != null)
      {
        htmlTypeMatch = '<a style="color:blue;text-decoration:none;" href="'+linkTypeMatch+'">'+htmlTypeMatch+'</a>';
      };
      if (teams[0].getAttribute('field') == 'home')
      {
        homeTeam = teams[0];
        awayTeam = teams[1];
      }
      else
      {
        homeTeam = teams[0];
        awayTeam = teams[1];
      }
      if (managerData == null)
      {
        homeHtml = '<a style="text-decoration:none;" href="/?p=team&tid='+ homeTeam.getAttribute('teamId') +'">'+homeTeam.getAttribute('teamName')+'</a>';
        awayHtml = '<a style="text-decoration:none;" href="/?p=team&tid='+ awayTeam.getAttribute('teamId') +'">'+awayTeam.getAttribute('teamName')+'</a>';
      }
      else
      {
        if (parseInt(homeTeam.getAttribute('teamId')) == managerData.teamId)
        {
          homeHtml = homeTeam.getAttribute('teamName');
          awayHtml = '<a style="text-decoration:none;" href="/?p=team&tid='+ awayTeam.getAttribute('teamId') +'">'+awayTeam.getAttribute('teamName')+'</a>';
        }
        else
        {
          homeHtml = '<a style="text-decoration:none;" href="/?p=team&tid='+ homeTeam.getAttribute('teamId') +'">'+homeTeam.getAttribute('teamName')+'</a>';
          awayHtml = awayTeam.getAttribute('teamName');
        }
      }
      var status = match.getAttribute('status');
      var backcolorScore;
      var bordercolorScore;
      var strAwayScore = '&nbsp;';
      var strHomeScore = '&nbsp;';
      if (status == 'scheduled') {
        backcolorScore = 'lime';
        bordercolorScore = 'lime';
      }
      else if (status == 'playing') {
        backcolorScore = 'yellow';
        bordercolorScore = 'yellow';
      }
      else
      {
        backcolorScore = 'white';
        strAwayScore = awayTeam.getAttribute('goals');
        strHomeScore = homeTeam.getAttribute('goals');
        var awayScore = parseInt(strAwayScore);
        var homeScore = parseInt(strHomeScore);
        if (managerData == null) {
          bordercolorScore = 'black';
        }
        else
        {
          bordercolorScore = 'yellow';
          if (parseInt(homeTeam.getAttribute('teamId')) == managerData.teamId)
          {
            if (homeScore > awayScore) {
              bordercolorScore = 'green';
            }
            else if (homeScore < awayScore) {
              bordercolorScore = 'red';
            }
          }
          else
          {
            if (homeScore > awayScore) {
              bordercolorScore = 'red';
            }
            else if (homeScore < awayScore) {
              bordercolorScore = 'green';
            }
          }
        }
      };
      htmlMatches = htmlMatches +
        '<table border="0" cellspacing="0" cellpadding="0" style="width:100%;border-top:solid 1px gray;"><tr style="background-color:#DDDDFF;width:27%;"><td style="padding-left:2px;"><a style="text-decoration:none;color:green;" href="/?p=match&sub=result&mid='+match.getAttribute('id')+'">'+match.getAttribute('date')+'</a></td><td style="width:73%;">'+htmlTypeMatch+'</td></tr></table>';
      htmlMatches = htmlMatches +
        '<table border="0" cellspacing="0" cellpadding="0" style="width:100%;border-top:solid 1px gray"><tr>' +
        '<td style="padding-right:4px;text-align:right;width:45%;">'+ homeHtml + '</td>'+
        '<td style="width:5%;text-align:center;border:solid 1px '+bordercolorScore+';background-color:'+backcolorScore+';color:black;">'+strHomeScore+'</td>' +
        '<td style="width:5%;text-align:center;border:solid 1px '+bordercolorScore+';background-color:'+backcolorScore+';color:black;">'+strAwayScore+'</td>'+
        '<td colspan="3" style="width:45%;padding-left:4px;">'+ awayHtml +'</td>'+
        '</tr></table>';
    }
    divManagerContent.innerHTML = htmlMatches;
    divManagerContent.style.display = '';
    CoZone.showDiv(divManagerInfo, X, Y);
    CoZone.hideLoading();
  },
  showDiv : function (div, X, Y) {
    div.style.left = String(X + window.pageXOffset - 80) + 'px';
    div.style.top = String(Y + window.pageYOffset - 30) + 'px';
    ++this.lastzIndex;
    div.style.zIndex = this.lastzIndex;
    div.style.display = '';
  },
  showLoading : function (X, Y) {
    this.showDiv(document.getElementById('cozone_divLoading'), X, Y);
  },
  hideLoading : function () {
    document.getElementById('cozone_divLoading').style.display = 'none';
  },
  dispatchClick : function (event) {
    var target = event.target;
    if((target.id == 'cozone_opDectivateFede') || (target.id == 'cozone_opActivateFede')) 
    {
      CoZone.TopicBoard.doActivateFedeTB();
    }
    else if(target.id.search(/cozone_skin_change_option-/i) == 0) 
    {
      CoZone.Skin.set(target.id.split('-')[1]);
    }
    else if(target.id == 'cozone_opShowImageLoad') 
    {
      CoZone.FormatTB.showImageLoad();
    }
    else if(target.id == 'cozone_opShowPreview') 
    {
      CoZone.FormatTB.showPreview();
    }
    else if(target.id == 'cozone_opFormatBold') 
    {
      CoZone.FormatTB.setBold();
    }
    else if(target.id == 'cozone_opFormatUnderline') 
    {
      CoZone.FormatTB.setUnderline();
    }
    else if(target.id == 'cozone_opFormatItalic') 
    {
      CoZone.FormatTB.setItalic();
    }
    else if(target.id == 'cozone_opFormatList') 
    {
      CoZone.FormatTB.setList();
    }
    else if(target.id == 'cozone_opFormatParagraph') 
    {
      CoZone.FormatTB.setParagraph();
    }
    else if(target.id == 'cozone_opFormatImage') 
    {
      CoZone.FormatTB.setImage();
    }
    else if(target.id == "cozone_opSeries")
    {
      CoZone.TopicBoard.doShowSeries(event.clientX, event.clientY);
    }
    else if (target.id == "cozone_opMatches")
    {
      CoZone.TopicBoard.doShowMatches(event.clientX, event.clientY);
    }
    else if (target.id == "cozone_opManagers")
    {
      CoZone.TopicBoard.doShowManagers(event.clientX, event.clientY);
    }
    else if(target.id == "cozone_opBuddySeries")
    {
      CoZone.BuddyTB.doShowSeries(event.clientX, event.clientY);
    }
    else if (target.id == "cozone_opBuddyMatches")
    {
      CoZone.BuddyTB.doShowMatches(event.clientX, event.clientY);
    }
    else if (target.id == "cozone_opBuddyManagers")
    {
      CoZone.BuddyTB.doShowManagers(event.clientX, event.clientY);
    }
    else if (target.id == "cozone_opNews")
    {
      CoZone.TopicBoard.doShowNews(event.clientX, event.clientY);
    }
    else if(target.id == "cozone_opNoFedeInfo")
    {
      CoZone.TopicBoard.showAddFede();
    }
    else if(target.id == "cozone_opLeages")
    {
      CoZone.TopicBoard.doShowLeages(event.clientX, event.clientY);
    }
    else if(target.id.search(/cozone_opQuoteMessage/i) == 0)
    {
      CoZone.ManagerPostTB.doQuoteMessage(target.parentNode.parentNode);
    }
    else if(target.id.search(/cozone_opManagerShortcuts/i) == 0)
    {
      CoZone.ManagerPostTB.doManagerAction(target.id.split('.'), CoZone.ManagerPostTB, CoZone.ManagerPostTB.doManagerShortcuts, event.clientX, event.clientY);
    }
    else if(target.id.search(/cozone_opManagerLeague/i) == 0)
    {
      CoZone.ManagerPostTB.doManagerAction(target.id.split('.'), CoZone.ManagerPostTB, CoZone.ManagerPostTB.doManagerLeague, event.clientX, event.clientY);
    }
    else if(target.id.search(/cozone_opManagerMatches/i) == 0)
    {
      CoZone.ManagerPostTB.doManagerAction(target.id.split('.'), CoZone, CoZone.showManagerPlayedMatches, event.clientX, event.clientY);
    }
    else if(target.id.search(/cozone_opManagerNextMatches/i) == 0)
    {
      CoZone.ManagerPostTB.doManagerAction(target.id.split('.'), CoZone, CoZone.showManagerNextMatches, event.clientX, event.clientY);
    }
    else if(target.id == 'cozone_opUpdateScript')
    {
      CoZone.ManagerTB.updateScript()
    }
    else if(target.id == 'cozone_opMyPlayedMatches')
    {
      CoZone.ManagerTB.showManagerPlayedMatches();
    }
    else if(target.id == 'cozone_opMyNextMatches')
    {
      CoZone.ManagerTB.showManagerNextMatches();
    };
  },
  requestManager : function (name, context, action, params, X, Y)
  {
    CoZone.showLoading(X, Y);
    CoZone.httpRequest('/xml/manager_data.php?sport_id='+CoZone.sport_id+'&username=' + name, this, this.responseLoadManager, [context, action, params]);
  },
  requestManagerByTeamId : function (teamId, context, action, params, X, Y)
  {
    CoZone.showLoading(X, Y);
    CoZone.httpRequest('/xml/manager_data.php?sport_id='+CoZone.sport_id+'&team_id=' + teamId, this, this.responseLoadManager, [context, action, params]);
  },
  responseLoadManager : function(context, callbackManagerLoaded, params, response) 
  {
    var managerData = null;
    if (response.status == 200) 
    {
      var userData = CoZone.parseXMLFromString(response.responseText).getElementsByTagName('UserData');
      if(userData.length > 0)
      {
        var teams = userData[0].getElementsByTagName('Team');
        var team;
        var i = 0;
        while ((i < teams.length) && (team == null))
        {
          if (teams[i].getAttribute('sport') == this.sport)
          {
            team = teams[i];
          }
          else
          {
            i++;
          }
        };
        if (team != null)
        {
          managerData = {
            name : userData[0].getAttribute('username'),
            id : parseInt(userData[0].getAttribute('userId')),
            teamName : team.getAttribute('teamName'),
            teamId : parseInt(team.getAttribute('teamId')),
            seriesName : team.getAttribute('seriesName'),
            seriesId : parseInt(team.getAttribute('seriesId')),
            fedes : new Array()
          };
          this.managers.push(managerData);
          this.sortManagerFor = null;
        };
      }
    }
    if (params == null) 
    { 
      params = new Array(); 
    }
    params.push(managerData);
    CoZone.hideLoading();
    callbackManagerLoaded.apply(context, params);
    return;
  },
  compareVersion : function (ver1, ver2) {
    if (typeof ver1 != 'string') {
      if (typeof ver2 != 'string') { return 0; }
      else { return -1; }
    }
    else { 
      if (typeof ver2 != 'string') { return 1; }
    }
    var version1 = ver1.split('.');
    var version2 = ver2.split('.');
    var minLength = Math.min(version1.length, version2.length);
    var compare = 0;
    var i = 0;
    while ((i < minLength) && (compare == 0))
    {
      compare = this.compareValue(parseInt(version1[i]), parseInt(version2[i]));
      i++;
    };
    if (compare == 0) {
      if (version1.length > version2.length) { compare = 1; }
      else { if (version1.length < version2.length) { compare = -1; } }
    }
    return compare;
  },
  compareValue : function (value1, value2) {
    var retVal = 0; 
    if (value1 > value2) { retVal = 1; } 
    else { if (value1 < value2) { retVal = -1; }; }; 
    return retVal; 
  }
}

CoZone.GuestbookBoard = {
  execute : function() {
    this.loadUI();
    CoZone.FormatTB.show();
  },
  loadUI : function() {
    var container = document.getElementsByName('writeForm')[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var elems = container.getElementsByClassName('listsecondary');
    var cellsManager = Array();
    for(var i = 0; i < (elems.length); i = i + 2)
      cellsManager.push(elems[i]);
    CoZone.ManagerPostTB.execute(cellsManager);
  }
}

CoZone.LeagueBoard = {
  execute : function() {
    this.loadUI();
    CoZone.FormatTB.show();
  },
  loadUI : function() {
    var container = document.getElementById('writeform').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var elems = container.getElementsByClassName('listsecondary');
    var cellsManager = Array();
    for(var i = 0; i < (elems.length); i = i + 2)
      cellsManager.push(elems[i]);
    CoZone.ManagerPostTB.execute(cellsManager);
  }
}

CoZone.TopicBoard = {
// Properties
  queries : new Array(
    ['DB4Script', 'http://www.cozone.com.ar/contents/publish/DB4Script.xml', 30],
    ['FedeNews4Script', 'http://www.cozone.com.ar/contents/publish/FedeNews4Script.xml', 30]
  ),
  fedes : new Array(),
  leagues : new Array(),
  fede : null,
  manageFede : null,
  textHeader : null,
  isRequestDB : false,
  timer4MsgAddFede : null,

// Methods
  execute : function () 
  {
    this.manageFede = GM_getValue('manageFede');
    if ((this.manageFede == null) || (this.manageFede == undefined)) this.manageFede = false;
    this.textHeader = CoZone.removeHTMLTags(document.getElementsByClassName('windowbg')[0].innerHTML);
    if(this.manageFede) 
    {
      this.requestDB(true);
    }
    else
    {
      this.loadUI();
    };
  },
  doActivateFedeTB : function() 
  {
    this.manageFede = !this.manageFede;
    GM_setValue('manageFede', this.manageFede);
    if (this.manageFede)
      if (this.isRequestDB)
        this.showToolbarFede()
      else
        this.requestDB(false)
    else
      this.showToolbarFede();
  },
  doShowLeages : function(X, Y)
  {
    var divLeagues = document.getElementById('cozone_divLeagues');
    var divLeaguesContent = document.getElementById('cozone_divLeaguesContent');
    if (divLeaguesContent.innerHTML == '&nbsp;')
    {
      var contentLeagues = '';
      var league;
      for (var i = 0; i < this.leagues.length; i++)
      {
        league = this.leagues[i];
        if(league.fedes.indexOf(this.fede.id) != -1)
        {
          var imageHtml;
          if (CoZone.sport_id == 1)
            imageHtml = '<img src="http://www.mzplus.com.ar/imgdin_liga?&idla='+ league.id +'&nombre='+ league.name +'" width=400 height=190 />'
          else
            imageHtml = '<div style="width:400px;height:190px;background-image:url('+GM_getResourceURL('FriendlyleagueDisabled')+');"><br /><span style="-moz-border-radius-bottomright:10px;-moz-border-radius-topright:10px;background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';opacity:0.6;padding:5px 10px;">'+CoZone.Locale.str('only_soccer')+'</span></div>';
          contentLeagues = contentLeagues + 
            '<div class="cozone_skin_toolbar" style="float:right;">' +
            CoZone.getToolbarButtonImgOut('ButtonFriendlyLeague', '/?p=friendlyseries&sub=standings&fsid=' + league.id, CoZone.Locale.str('league_standings')) +
            CoZone.getToolbarButtonImgOut('ButtonMatchNext', '/?p=friendlyseries&sub=matches&fsid=' + league.id, CoZone.Locale.str('league_matches')) +
            CoZone.getToolbarButtonImgOut('ButtonTopScorer', '/?p=friendlyseries&sub=topscorer&fsid=' + league.id, CoZone.Locale.str('league_top_scorer')) +
            CoZone.getToolbarButtonImgOut('ButtonForum', '/?p=friendlyseries&sub=board&fsid=' + league.id, CoZone.Locale.str('league_message_board')) +
            '</div>' +
            '<div style="font-size:12px;font-weight:bold;float:right;color:white;">'+ league.name +'&nbsp;</div><br/>' +
            imageHtml + '<br />';
        }
      }
      divLeaguesContent.innerHTML = contentLeagues;
    }
    CoZone.showDiv(divLeagues, X, Y);
  },
  doShowNews : function(X, Y)
  {
    var divNews = document.getElementById('cozone_divNews');
    var divNewsContent = document.getElementById('cozone_divNewsContent');
    if (divNewsContent.innerHTML == '&nbsp;')
    {
      this.doLoadNews(divNews, divNewsContent, X, Y);
    }
    else
    {
      CoZone.showDiv(divNews, X, Y);
    }
  },
  doShowManagers : function(X, Y)
  {
    var divManagers = document.getElementById('cozone_divManagers');
    var divManagersContent = document.getElementById('cozone_divManagersContent');
    if (divManagersContent.innerHTML == '&nbsp;')
    {
      var contentManagers = '';
      CoZone.sortManagersByName();
      var manager;
      for (var i = 0; i < CoZone.managers.length; i++)
      {
        manager = CoZone.managers[i];
        if(manager.fedes.indexOf(this.fede.id) != -1)
        {
          contentManagers = contentManagers + 
            '<div style="text-align:right;padding-right:2px;">' + CoZone.getHtmlManagerTB(manager.name, manager.id, manager) + '</div><br />';
        }
      }
      divManagersContent.innerHTML = contentManagers;
    }
    CoZone.showDiv(divManagers, X, Y);
  },
  doShowMatches : function(X, Y)
  {
    var divMatches = document.getElementById('cozone_divMatches');
    var divMatchesContent = document.getElementById('cozone_divMatchesContent');
    if (divMatchesContent.innerHTML == '&nbsp;')
    {
      var contentMatches = '';
      CoZone.sortManagersByName();
      var manager;
      for (var i = 0; i < CoZone.managers.length; i++)
      {
        manager = CoZone.managers[i];
        if(manager.fedes.indexOf(this.fede.id) != -1)
        {
          contentMatches = contentMatches + CoZone.getContentMatch(manager);
        }
      }
      divMatchesContent.innerHTML = contentMatches;
    }
    CoZone.showDiv(divMatches, X, Y);
  },
  doShowSeries : function(X, Y) 
  {
    var divSeries = document.getElementById('cozone_divSeries');
    var divSeriesContent = document.getElementById('cozone_divSeriesContent');
    if (divSeriesContent.innerHTML == '&nbsp;')
    {
      var contentSeries = '';
      CoZone.sortManagersBySerie();
      var manager;
      for (var i = 0; i < CoZone.managers.length; i++)
      {
        manager = CoZone.managers[i];
        if(manager.fedes.indexOf(this.fede.id) != -1)
        {
          contentSeries = contentSeries + CoZone.getContentSerie(manager);
        }
      }
      divSeriesContent.innerHTML = contentSeries;
    }
    CoZone.showDiv(divSeries, X, Y);
  },
  requestDB : function(loadUI) 
  {
    if(!this.isRequestDB)
    {
      this.isRequestDB = true;
      var xml = CoZone.parseXMLFromString(GM_getValue("query.DB4Script.xml"));
      if (xml != null)
      {
        var updateTS = parseInt(GM_getValue("query.DB4Script.updateTS"));
        var versionScript = GM_getValue("query.DB4Script.versionScript");
        if (((updateTS + (this.queries[0][2] * 60000)) < new Date().getTime()) ||
            (CoZone.compareVersion(versionScript, CoZone.currentVersionScript) != 0))
        { 
          CoZone.httpRequest(this.queries[0][1], this, this.responseDB4Script, [xml, loadUI]);
        }
        else
        {
          this.loadDB(xml);
          if (loadUI) this.loadUI()
          else this.showToolbarFede();
        }
      }
      else
      {
        CoZone.httpRequest(this.queries[0][1], this, this.responseDB4Script, [null, loadUI]);
      }
    };
  },
  loadDB : function (xmlDB4Script) {
    if(xmlDB4Script != null)
    {
      var nodeList = xmlDB4Script.getElementsByTagName('Fede');
      var node;
      for (var i = 0; i < nodeList.length; i++)
      {
        node = nodeList[i];
        this.fedes.push({
          id : parseInt(node.getAttribute('fedeId')), 
          forumUniqueText : node.getAttribute('fedeForumUniqueText'),
          name : node.getAttribute('fedeName') });
      };
      nodeList = xmlDB4Script.getElementsByTagName('FriendlyLeague');
      for (var i = 0; i < nodeList.length; i++)
      {
        node = nodeList[i];
        this.leagues.push({
          name : node.getAttribute('friendlyleagueName'), 
          id : parseInt(node.getAttribute('friendlyleagueId')),
          fedes : this.getListFede(node.getElementsByTagName('FriendlyLeagueFede')) });
      };
      nodeList = xmlDB4Script.getElementsByTagName('Manager');
      for (var i = 0; i < nodeList.length; i++)
      {
        node = nodeList[i];
        CoZone.managers.push({
          name : node.getAttribute('userName'), 
          id: parseInt(node.getAttribute('userId')), 
          teamName : node.getAttribute('teamName'), 
          teamId : parseInt(node.getAttribute('teamId')), 
          seriesName : node.getAttribute('seriesName'), 
          seriesId : parseInt(node.getAttribute('seriesId')), 
          fedes : this.getListFede(node.getElementsByTagName('ManagerFede')) });
      };
      this.initFede();
    }
  },
  loadUI : function () {
    var elems = document.getElementsByClassName('listsecondary');
    var id;
    var name;
    var cellsManager = Array();
    document.getElementById('topDiv').innerHTML +=
      '<div id="cozone_divSeries" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divSeries', CoZone.Locale.str('manager_leagues')) +'<div id="cozone_divSeriesContent" style="height:500px;overflow:scroll;clear:both;">&nbsp;</div></div>' +
      '<div id="cozone_divManagers" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divManagers', CoZone.Locale.str('manager_shortcuts')) +'<div id="cozone_divManagersContent" style="height:500px;overflow:scroll;clear:both;">&nbsp;</div></div>' +
      '<div id="cozone_divLeagues" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divLeagues', CoZone.Locale.str('federation_fiendlyleagues')) +'<div id="cozone_divLeaguesContent" style="height:500px;overflow:scroll;clear:both;">&nbsp;</div></div>' +
      '<div id="cozone_divNews" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divNews', CoZone.Locale.str('ads_federation')) +'<div id="cozone_divNewsContent" style="height:500px;width:660px;overflow:scroll;clear:both;">&nbsp;</div></div>' +
      '<div id="cozone_divMatches" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divMatches', CoZone.Locale.str('manager_matches')) +'<div id="cozone_divMatchesContent" style="height:500px;overflow:scroll;clear:both;">&nbsp;</div></div>';
    for(row = 0; row < elems.length; row++)
    {
      if(elems[row].childNodes[1].tagName.toUpperCase() == 'TABLE')
      {
        cellsManager.push(elems[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0]);
      }
      else
      {
        cellsManager.push(elems[row].parentNode.parentNode.parentNode.rows[1].cells[0]);
        elems[row].innerHTML += 
          '<div class="cozone_skin_toolbar" style="float:left;">' + 
          '<div id="cozone_divActivateFede" style="float:left;height:16px"></div>' +
          '<div id="cozone_divOptionsFede" style="float:left;display:none;height:16px;margin:0px 0px 0px 4px;"></div></div>';
      }
    }
    CoZone.ManagerPostTB.execute(cellsManager);
    this.showToolbarFede();
    CoZone.FormatTB.show();
    this.showGoToLast();
  },
  getButtonActivateFede : function() {
    if (this.manageFede)
    {
      return CoZone.getToolbarButtonImg('ButtonCancel', 'cozone_opDectivateFede', CoZone.Locale.str('deactivate_federation'));
    }
    else
    {
      return CoZone.getToolbarButtonImg('ButtonPlus', 'cozone_opActivateFede', CoZone.Locale.str('activate_federation'));
    }
  },
  showGoToLast : function () {
    var path = window.location.href;
    var pathLength = path.length;
    var pos = path.indexOf('offset=');
    var offset = 0;
    if(pos != -1) {
      var nextPos = path.indexOf('&', pos);
      if(path[pos-1] == '&') { --pos; };
      if (nextPos == -1) {
        if(pathLength > (pos+8)) {
          offset = parseInt(path.substring(pos+8));
        };
        path = path.substring(0, pos);
      }
      else {
        if(nextPos > (pos+8)) {
          offset = parseInt(path.substring(pos+8, nextPos));
        };
        path = path.substring(0, pos) + path.substring(nextPos);
      }
    };
    var htmlCountPost = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table[2]/tbody/tr[2]/td', document, null, XPathResult.ANY_TYPE, null);
    var item = htmlCountPost.iterateNext();
    var elementCountPost = item.innerHTML.split(' ');
    var countPost = parseInt(elementCountPost[4]);
    if (offset+50 < countPost) {
      var offsetToLast = Math.floor((countPost-1)/50)*50;
      var htmlPages = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table[2]/tbody/tr[3]/td/table/tbody/tr/td[2]', document, null, XPathResult.ANY_TYPE, null);
      var strToLast = '&nbsp;<a href="'+path+'&offset='+offsetToLast+'" title="'+CoZone.Locale.str('nonstop_last_page')+'">&gt;&gt;</a>';
      item = htmlPages.iterateNext();
      item.innerHTML = item.innerHTML + strToLast;
      htmlPages = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table[53]/tbody/tr/td[2]', document, null, XPathResult.ANY_TYPE, null);
      item = htmlPages.iterateNext();
      item.innerHTML = item.innerHTML + strToLast;
    };
  },
  showAddFede : function () {
    document.getElementById('cozone_divOptionsFede').innerHTML = '<span style="color:'+CoZone.Skin.style.color+';"><a style="color:'+CoZone.Skin.style.color+';" href="/?p=guestbook&uid=3433479">'+CoZone.Locale.str('contact_me')+'</a> '+CoZone.Locale.str('to_add_your_federation')+'</span>';
    this.timer4MsgAddFede = setTimeout(function () { CoZone.TopicBoard.showToolbarFede.apply(CoZone.TopicBoard); } , 10000);
  },
  showToolbarFede : function () {
    clearTimeout(this.timer4MsgAddFede);
    var divActDeac = document.getElementById('cozone_divActivateFede');
    divActDeac.innerHTML = this.getButtonActivateFede();
    var divOptionsFede = document.getElementById('cozone_divOptionsFede');
    if (this.manageFede)
    {
      if (this.fede == null)
      {
        divOptionsFede.innerHTML = CoZone.getToolbarButtonIn('no info', 'cozone_opNoFedeInfo', CoZone.Locale.str('no_information_federation'));
      }
      else
      {
        divOptionsFede.innerHTML = (
          CoZone.getToolbarButtonImg('ButtonFriendlyLeague', 'cozone_opLeages', CoZone.Locale.str('federation_fiendlyleagues')) +
          CoZone.getToolbarButtonImg('ButtonLink', 'cozone_opManagers', CoZone.Locale.str('manager_shortcuts')) +  
          CoZone.getToolbarButtonImg('ButtonLeague', 'cozone_opSeries', CoZone.Locale.str('manager_leagues')) +  
          CoZone.getToolbarButtonImg('ButtonMatchPlayedIn', 'cozone_opMatches', CoZone.Locale.str('manager_matches')) +  
          CoZone.getToolbarButtonImg('ButtonNews', 'cozone_opNews', CoZone.Locale.str('ads_federation'))
        );
      }
      divOptionsFede.style.display = '';
    }
    else
    {
      divOptionsFede.style.display = 'none';
    }
    
  },
  doLoadNews : function (divNews, divNewsContent, X, Y) {
    CoZone.showLoading(X, Y);
    var xml = CoZone.parseXMLFromString(GM_getValue("query.FedeNews4Script.xml"));
    if (xml != null)
    {
      var updateTS = parseInt(GM_getValue("query.FedeNews4Script.updateTS"));
      var versionScript = GM_getValue("query.FedeNews4Script.versionScript");
      if (((updateTS + (this.queries[1][2] * 60000)) < new Date().getTime()) ||
          (CoZone.compareVersion(versionScript, CoZone.currentVersionScript) != 0))
      {
        CoZone.httpRequest(
          this.queries[1][1], 
          this,
          this.responseFedeNews4Script, 
          [divNews, divNewsContent, X, Y, xml]);
      }
      else
      {
        this.loadNews(divNews, divNewsContent, X, Y, xml);
      }
    }
    else
    {
      CoZone.httpRequest(this.queries[1][1], this, this.responseFedeNews4Script, [divNews, divNewsContent, X, Y, null]);
    }
  },
  loadNews : function (divNews, divNewsContent, X, Y, xmlFedeNews4Script) {
    if(xmlFedeNews4Script != null)
    {
      divNewsContent.innerHTML = xmlFedeNews4Script.getElementsByTagName('NewsHtml')[0].childNodes[1].nodeValue;
      CoZone.showDiv(divNews, X, Y);
    }
    CoZone.hideLoading();
  },
  responseFedeNews4Script : function (divNews, divNewsContent, X, Y, xmlFedeNews4ScriptActual, response) {
    var updateXml = new Date();
    GM_setValue("query.FedeNews4Script.updateTS", String(updateXml.getTime()));
    GM_setValue("query.FedeNews4Script.updateDT", String(updateXml));
    if(response.status == 200)
    {
      var xmlFedeNews4Script = CoZone.parseXMLFromString(response.responseText);
      var nodeCoZone = xmlFedeNews4Script.getElementsByTagName("CoZone")[0];
      if ((nodeCoZone != null) && (nodeCoZone.getAttribute('query') == this.queries[1][0]))
      {
        GM_setValue("query.FedeNews4Script.xml", response.responseText);
        GM_setValue("query.FedeNews4Script.versionScript", CoZone.currentVersionScript);
        this.loadNews(divNews, divNewsContent, X, Y, xmlFedeNews4Script);
      }
      else
      {
        this.loadNews(divNews, divNewsContent, X, Y, xmlFedeNews4ScriptActual);
      }
    }
    else
    {
      this.loadNews(divNews, divNewsContent, X, Y, xmlFedeNews4ScriptActual);
    }
  },
  responseDB4Script : function (xmlDB4ScriptActual, loadUI, response) {
    var updateXml = new Date();
    GM_setValue("query.DB4Script.updateTS", String(updateXml.getTime()));
    GM_setValue("query.DB4Script.updateDT", String(updateXml));
    if(response.status == 200)
    {
      var xmlDB4Script = CoZone.parseXMLFromString(response.responseText);
      var nodeCoZone = xmlDB4Script.getElementsByTagName("CoZone")[0];
      if ((nodeCoZone != null) && (nodeCoZone.getAttribute('query') == this.queries[0][0]))
      {
        GM_setValue("query.DB4Script.xml", response.responseText);
        GM_setValue("query.DB4Script.versionScript", CoZone.currentVersionScript);
        this.loadDB(xmlDB4Script);
      }
      else
      {
        this.loadDB(xmlDB4ScriptActual);
      }
    }
    else
    {
      this.loadDB(xmlDB4ScriptActual);
    }
    if (loadUI) 
      this.loadUI()
    else 
      this.showToolbarFede();
  },
  initFede : function () {
    var i = 0;
    this.fede = null;
    while ((i < this.fedes.length) && (this.fede == null))
    {
      if (this.textHeader.search(this.fedes[i].forumUniqueText) != -1)
      {
        this.fede = this.fedes[i];
      }
      else
      {
        i++;
      }
    };
    return;
  },
  getListFede : function (nodesFedes) {
    var listFede = new Array();
    for (var i = 0; i < nodesFedes.length; i++) {
      listFede.push(parseInt(nodesFedes[i].getAttribute('fedeId')));
    };
    return listFede;
  }
};

CoZone.ForumTopics = {
  execute : function () {
    var htmlCountPost = document.evaluate('/html/body/div[3]/div/div[4]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
    var items = htmlCountPost.iterateNext();
    var link;
    var htmlCell;
    var offset;
    for(var i = 2; i < items.rows.length; i++)
    {
      link = items.rows[i].cells[0].childNodes[0].href;
      htmlCell = items.rows[i].cells[1].innerHTML;
      offset = Math.floor((parseInt(htmlCell.split(' / ')[1])-1)/50)*50;
      items.rows[i].cells[1].innerHTML = htmlCell + '&nbsp;<a href="'+ link +'&offset='+ offset +'" title="'+CoZone.Locale.str('nonstop_last_page')+'">&gt;&gt;</a>';
    };
    CoZone.FormatTB.show();
  }
};

/********************************
// CoZone.FormatTB
********************************/
CoZone.FormatTB = {
  elemTable : null,
  elemMessage : null,
  containerForm : null,
  elemTitle : null,
  
  show : function () {
    this.initGlobals();
    this.getElem4Toolbar().innerHTML = this.getHtmlToolbar();
  },
  initGlobals : function () {
    if (CoZone.locationOnSite == 'forumtopics')
    {
      this.elemTable = document.getElementsByName('forumform')[0].parentNode;
      this.elemMessage = document.getElementsByName('message')[0];
      this.containerForm = document.getElementsByName('forumform')[0].parentNode;
      this.elemTitle = document.getElementsByName('title')[0];
    }
    if (CoZone.locationOnSite == 'topicboard')
    {
      this.elemTable = document.getElementById('forumform').getElementsByTagName('table')[0];
      this.elemMessage = document.getElementsByName('message')[0];
      this.containerForm = document.getElementById('forumform');
      this.elemTitle = document.getElementsByName('title')[0];
    }
    else if (CoZone.locationOnSite == 'guestbook')
    {
      this.elemTable = document.getElementsByName('writeForm')[0].parentNode.parentNode.parentNode.parentNode;
      this.elemMessage = document.getElementsByName('msg')[0];
      this.containerForm = document.getElementsByName('writeForm')[0].parentNode.parentNode.parentNode.parentNode.parentNode;
    }
    else if (CoZone.locationOnSite == 'leagueboard')
    {
      this.elemTable = document.getElementById('writeform').parentNode.parentNode.parentNode.parentNode;
      this.elemMessage = document.getElementsByName('msg')[0];
      this.containerForm = document.getElementById('writeform').parentNode.parentNode.parentNode.parentNode.parentNode;
    }
  },
  getElem4Toolbar : function () {
    if ((CoZone.locationOnSite == 'topicboard') || (CoZone.locationOnSite == 'forumtopics'))
    {
      var elemRow = this.elemTable.insertRow(2);
      elemRow.insertCell(-1)
      return elemRow.insertCell(-1);
    }
    else if ((CoZone.locationOnSite == 'guestbook') || (CoZone.locationOnSite == 'leagueboard'))
    {
      var elemRow = this.elemTable.insertRow(0);
      var elemCell = elemRow.insertCell(-1);
      elemCell.style.paddingLeft = this.elemMessage.offsetLeft + 'px';
      return elemCell;
    }
  },
  getHtmlToolbar : function() {
    return (
      '<div class="cozone_skin_toolbar" style="float:left;">' +
      CoZone.getToolbarButtonImg('ButtonBold', 'cozone_opFormatBold', CoZone.Locale.str('format_bold')) +  
      CoZone.getToolbarButtonImg('ButtonItalic', 'cozone_opFormatItalic', CoZone.Locale.str('format_italic')) +  
      CoZone.getToolbarButtonImg('ButtonUnderline', 'cozone_opFormatUnderline', CoZone.Locale.str('format_underline')) +  
      CoZone.getToolbarButtonImg('ButtonImage', 'cozone_opFormatImage', CoZone.Locale.str('format_image')) +  
      CoZone.getToolbarButtonImg('ButtonImageLoad', 'cozone_opShowImageLoad', CoZone.Locale.str('format_image_load')) +  
      CoZone.getToolbarButtonImg('ButtonPreview', 'cozone_opShowPreview', CoZone.Locale.str('format_preview')) +  
      '</div>');
  },
  showImageLoad : function () {
    var frameTinypic = document.getElementById('cozone_tinypic_plugin_cozone');
    if (frameTinypic == null) 
    {
      frameTinypic = document.createElement('iframe');
      frameTinypic.setAttribute('id', 'cozone_tinypic_plugin_cozone');
      frameTinypic.setAttribute('style', 'border:1em solid '+CoZone.Skin.style.backgroundColor+';width:96%;height:530px;');
      frameTinypic.setAttribute('src', 'http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,url|i,en|s,false');
      this.containerForm.parentNode.appendChild(frameTinypic);
    };
    window.location.href = '#cozone_tinypic_plugin_cozone';
  },
  showPreview : function () 
  {
    var messagePreview = document.getElementById('cozone_preview_body');
    if (messagePreview == null) 
    {
      var contPreview = document.createElement('div');
      contPreview.id = 'cozone_preview_container';
      contPreview.setAttribute('style', 'background-image:url('+GM_getResourceURL('PreviewWatermark')+');border-left:1em solid '+CoZone.Skin.style.backgroundColor+';border-right:1em solid '+CoZone.Skin.style.backgroundColor+';');

      var title = document.createElement('div');
      title.setAttribute('style', 'background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';padding:0px 2px 0px 2px;');
      title.innerHTML = '<strong>'+CoZone.Locale.str('format_preview')+'</strong>';

      var titlePost = document.createElement('div');
      titlePost.id = 'cozone_preview_title';
      titlePost.setAttribute('style', 'background-color:#CCCCCC;color:black;font-weight:bold;display:none;padding:0px 2px 0px 2px;');

      var bodyPost = document.createElement('div');
      bodyPost.id = 'cozone_preview_body';
      bodyPost.setAttribute('style', 'overflow:auto;width:88%;padding:2px;');
      
      var footer =  document.createElement('div');
      footer.setAttribute('style', 'background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';height:1em;');
      
      contPreview.appendChild(title);
      contPreview.appendChild(titlePost);
      contPreview.appendChild(bodyPost);
      contPreview.appendChild(footer);
      
      this.containerForm.parentNode.insertBefore(contPreview, this.containerForm);
      messagePreview = bodyPost;
    };
    if (messagePreview != null) 
    {
      if (this.elemTitle != null)
      {
        var titlePreview = document.getElementById('cozone_preview_title');
        titlePreview.innerHTML = (this.elemTitle.value.length == 0) ? '&nbsp;' : this.elemTitle.value;
        titlePreview.style.display = '';
      };
      strPost = this.elemMessage.value;
      strPost = CoZone.alltrim(CoZone.removeHTMLTags(strPost));
      strPost = strPost.replace(/\[\/b\]/gi, '</b>').replace(/\[b\]/gi, '<b>').replace(/\[\/i\]/gi, '</i>').replace(/\[i\]/gi, '<i>').replace(/\[\/u\]/gi, '</u>').replace(/\[u\]/gi, '<u>').replace(/\n/g,'<br />');
      var images = strPost.match(/\[image url=\S+\]/g);
      if (images != null)
      {
        for (var i = 0; i < images.length; i++)
        {
          strPost = strPost.replace(images[i], images[i].replace('[image url=', '<img src="').replace(']', '" />'));
        }
      };
      messagePreview.innerHTML = strPost;
      window.location.href = '#cozone_preview_container';
    };
  },
  setFormat : function (format) {
    var scroll = this.elemMessage.scrollTop;
    var start = this.elemMessage.selectionStart;
    var end = this.elemMessage.selectionEnd;
    var msgText = this.elemMessage.value;
    var lenFormatX2 = format.length * 2;
    this.elemMessage.value = msgText.substr(0, start) + '['+format+']' + msgText.substr(start, end - start) + '[/'+format+']' + msgText.substr(end, msgText.length);
    this.elemMessage.selectionStart = end+5+lenFormatX2;
    this.elemMessage.selectionEnd = end+5+lenFormatX2;
    this.elemMessage.scrollTop = scroll;
    this.elemMessage.focus();    
  },
  setBold : function () {
    this.setFormat('b');
  },
  setUnderline : function () {
    this.setFormat('u');
  },
  setItalic : function () {
    this.setFormat('i');
  },
  setImage : function () {
    var scroll = this.elemMessage.scrollTop;
    var start = this.elemMessage.selectionStart;
    var end = this.elemMessage.selectionEnd;
    var msgText = this.elemMessage.value;
    var uriImage = msgText.substr(start, end - start);
    var offset = 0;
    if(uriImage.length == 0) {
      uriImage = prompt(CoZone.Locale.str('enter_link_to_image'));
      offset = uriImage.length;
    }
    this.elemMessage.value = msgText.substr(0, start) + '[image url='+uriImage+']' + msgText.substr(end, msgText.length);
    this.elemMessage.selectionStart = end+12+offset;
    this.elemMessage.selectionEnd = end+12+offset;
    this.elemMessage.scrollTop = scroll;
    this.elemMessage.focus();    
  }
};

/********************************
// CoZone.BuddyTB
********************************/
CoZone.BuddyTB = {
  buddyList : null,
  
  show : function () 
  {
    var buddies = document.getElementById('buddy_list');
    this.buddyList = new Array();
    var list = buddies.getElementsByTagName('dd');
    if (list.length > 0)
    {
      var anchors;
      var onclickIM;
      var hrefGuestbook;
      for (var i = 0; i < list.length; i++)
      {
        anchors = list[i].getElementsByTagName('a');
        if(anchors.length == 2)
        {
          onclickIM = anchors[0].getAttribute('onclick');
          hrefGuestbook = anchors[1].href;
          if ( (onclickIM.search(/purchasechallenge/i) != -1) &&
               (hrefGuestbook.search(/guestbook/i) != -1) )
          {
            this.buddyList.push( {
              teamId : parseInt(onclickIM.split(',')[2].split('\'')[1]),
              userId : parseInt(hrefGuestbook.split('&')[1].replace('uid=', ''))
            } );
          }
        }
      }
      document.getElementById('topDiv').innerHTML +=
        '<div id="cozone_divBuddySeries" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divBuddySeries', CoZone.Locale.str('manager_leagues')) +'<div id="cozone_divBuddySeriesContent" style="height:500px;overflow:scroll;clear:both;"></div></div>' +
        '<div id="cozone_divBuddyManagers" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divBuddyManagers', CoZone.Locale.str('manager_shortcuts')) +'<div id="cozone_divBuddyManagersContent" style="height:500px;overflow:scroll;clear:both;"></div></div>' +
        '<div id="cozone_divBuddyMatches" style="padding:8px;position:absolute;background-color:black;color:white;display: none">'+ CoZone.getDivTitleBar('cozone_divBuddyMatches', CoZone.Locale.str('manager_matches')) +'<div id="cozone_divBuddyMatchesContent" style="height:500px;overflow:scroll;clear:both;"></div></div>';
      buddies.parentNode.parentNode.parentNode.getElementsByClassName('win_bg')[0].innerHTML += 
        '<div class="cozone_skin_toolbar" style="float:right;margin-top:2px;">' + 
        CoZone.getToolbarButtonImg('ButtonLink', 'cozone_opBuddyManagers', CoZone.Locale.str('manager_shortcuts')) +  
        CoZone.getToolbarButtonImg('ButtonLeague', 'cozone_opBuddySeries', CoZone.Locale.str('manager_leagues')) +  
        CoZone.getToolbarButtonImg('ButtonMatchPlayedIn', 'cozone_opBuddyMatches', CoZone.Locale.str('manager_matches')) +  
        '</div>';
    }
    else
    {
      buddies.parentNode.parentNode.parentNode.getElementsByClassName('win_bg')[0].innerHTML += 
        '<div class="cozone_skin_toolbar" style="float:right;margin-top:2px;">' + 
        'no info' +
        '</div>';
    }
  },
  doShowManagers : function(X, Y)
  {
    var divManagers = document.getElementById('cozone_divBuddyManagers');
    var divManagersContent = document.getElementById('cozone_divBuddyManagersContent');
    Y = Y - 100;
    if (divManagersContent.innerHTML.length == 0)
    {
      var div;
      var managerData;
      var item;
      for (var i = 0; i < this.buddyList.length; i++)
      {
        item = this.buddyList[i];
        div = document.createElement('div');
        div.style.textAlign = 'right';
        div.style.padding = '0px 2px 0px 0px';
        managerData = CoZone.findManagerById(item.userId);
        if (managerData == null)
        {
          CoZone.requestManagerByTeamId(item.teamId, this, this.requestManagers, [div, divManagers, X, Y], X, Y);
        }
        else
        {
          this.requestManagers(div, divManagers, X, Y, managerData);
        };
        divManagersContent.appendChild(div);
        divManagersContent.appendChild(document.createElement('br'));
      }
    }
    else
    {
      CoZone.showDiv(divManagers, X, Y);
    }
  },
  doShowMatches : function(X, Y)
  {
    var divMatches = document.getElementById('cozone_divBuddyMatches');
    var divMatchesContent = document.getElementById('cozone_divBuddyMatchesContent');
    Y = Y - 100;
    if (divMatchesContent.innerHTML.length == 0)
    {
      var div;
      var managerData;
      var item;
      for (var i = 0; i < this.buddyList.length; i++)
      {
        item = this.buddyList[i];
        div = document.createElement('div');
        managerData = CoZone.findManagerById(item.userId);
        if (managerData == null)
        {
          CoZone.requestManagerByTeamId(item.teamId, this, this.requestMatches, [div, divMatches, X, Y], X, Y);
        }
        else
        {
          this.requestMatches(div, divMatches, X, Y, managerData);
        };
        divMatchesContent.appendChild(div);
      }
    }
    else
    {
      CoZone.showDiv(divMatches, X, Y);
    }
  },
  requestMatches : function (div, divMatches, X, Y, managerData)
  {
    div.innerHTML = CoZone.getContentMatch(managerData);
    if (divMatches.style.display == 'none')
      CoZone.showDiv(divMatches, X, Y);
  },
  doShowSeries : function(X, Y)
  {
    var divSeries = document.getElementById('cozone_divBuddySeries');
    var divSeriesContent = document.getElementById('cozone_divBuddySeriesContent');
    Y = Y - 100;
    if (divSeriesContent.innerHTML.length == 0)
    {
      var div;
      var managerData;
      var item;
      for (var i = 0; i < this.buddyList.length; i++)
      {
        item = this.buddyList[i];
        div = document.createElement('div');
        managerData = CoZone.findManagerById(item.userId);
        if (managerData == null)
        {
          CoZone.requestManagerByTeamId(item.teamId, this, this.requestSeries, [div, divSeries, X, Y], X, Y);
        }
        else
        {
          this.requestSeries(div, divSeries, X, Y, managerData);
        };
        divSeriesContent.appendChild(div);
      }
    }
    else
    {
      CoZone.showDiv(divSeries, X, Y);
    }
  },
  requestSeries : function (div, divSeries, X, Y, managerData)
  {
    div.innerHTML = CoZone.getContentSerie(managerData);
    if (divSeries.style.display == 'none')
      CoZone.showDiv(divSeries, X, Y);
  },
  requestManagers : function (div, divManagers, X, Y, managerData)
  {
    div.innerHTML = CoZone.getHtmlManagerTB(managerData.name, managerData.id, managerData);
    if (divManagers.style.display == 'none')
      CoZone.showDiv(divManagers, X, Y);
  }
};

/********************************
// CoZone.ManagerTB
********************************/
CoZone.ManagerTB = {
  myData : null,
  
  show : function () 
  {
    var divLogout = document.getElementById('logout_etc');
    divLogout.innerHTML += 
      '<div style="float:right;margin-top:11px;height:16px;z-index:999;">' +
      '<div class="cozone_skin_toolbar" style="float:right;">' +
      CoZone.getToolbarButtonImgOut('ButtonLeague', '/?p=series', CoZone.Locale.str('league')) +
      CoZone.getToolbarButtonImgOut('ButtonTrainingReport', '/?p=training_report', CoZone.Locale.str('training_report')) +
      CoZone.getToolbarButtonImgOut('ButtonTrainingField', '/?p=training', CoZone.Locale.str('training_field')) +
      CoZone.getToolbarButtonImgOut('ButtonTactics', '/?p=tactics', CoZone.Locale.str('tactics')) +
      CoZone.getToolbarButtonImgOut('ButtonPlayers', '/?p=players', CoZone.Locale.str('players')) +
      CoZone.getToolbarButtonImgOut('ButtonInjuredSuspended', '/?p=players&sub=unavailable', CoZone.Locale.str('injured_suspended')) +
      CoZone.getToolbarButtonImgOut('ButtonMatchPlayed', '/?p=match&sub=played&hidescore=1', CoZone.Locale.str('played_matches')) +
      CoZone.getToolbarButtonImgOut('ButtonMatchNext', '/?p=match&sub=scheduled', CoZone.Locale.str('upcoming_matches')) +
      CoZone.getToolbarButtonImgOut('ButtonTransfersMonitoring', '/?p=transfer&sub=yourplayers', CoZone.Locale.str('transfers_monitoring')) +
      CoZone.getToolbarButtonImgOut('ButtonForum', '/?p=forum', CoZone.Locale.str('forum')) +
      CoZone.getToolbarButtonImg('ButtonMatchPlayedIn', 'cozone_opMyPlayedMatches', CoZone.Locale.str('played_matches')) +
      CoZone.getToolbarButtonImg('ButtonMatchNextIn', 'cozone_opMyNextMatches', CoZone.Locale.str('upcoming_matches')) +
      this.getSkinChangeOption() +
      '</div>' +
      '<div id="cozone_update_script" style="-moz-border-radius:3px;display:none;background-color:red;float:left;padding:2px 2px 0px 2px;height:16px">' + 
      CoZone.getToolbarButtonIn('update', 'cozone_opUpdateScript', CoZone.Locale.str('update_cozone')) +
      '</div>'+
      '</div>';
    document.getElementById('topDiv').innerHTML +=
      '<div id="cozone_divManagerInfo" style="padding:8px;position:absolute;background-color:black;color:white;display:none">'+ CoZone.getDivTitleBar('cozone_divManagerInfo') +'<div id="cozone_divManagerTB" style="text-align:right;height:18px;">&nbsp;</div><div id="cozone_divManagerContent" style="background-color:#F9F6F0;color:black;width:400px;">&nbsp;</div></div>' +
      '<div id="cozone_divLoading" style="display:none;background-color:black;position:absolute;border:solid 2px black;padding:0px;width:16px;height:16px;"><img src="'+GM_getResourceURL('LoadingImage')+'" /></div>';
  },
  getSkinChangeOption : function()
  {
    GM_addStyle(' \
      #cozone_skin_change \
      {	\
        margin: 0; \
        padding: 0; \
        z-index: 30 \
      } \
      #cozone_skin_change li \
      {	\
        margin: 0; \
        padding: 0; \
        list-style: none; \
        float: left; \
        font: bold 11px arial \
      } \
      #cozone_skin_change li a \
      {	\
        display: block; \
        margin: 0 1px 0 0; \
        padding: 4px 10px; \
        width: 60px; \
        background: #5970B2; \
        color: #FFF; \
        text-align: center; \
        text-decoration: none \
      } \
      #cozone_skin_change li a:hover \
      { \
        background: #49A3FF \
      } \
      #cozone_skin_change div \
      { \
        position: absolute; \
        visibility: hidden; \
        margin: 0; \
        padding: 0; \
        width : 24px; \
        background: gray; \
        border: 1px solid #5970B2 \
      } \
      #cozone_skin_change div span \
      { \
        border : 2px solid gray; \
        position: relative; \
        display: block; \
        margin: 0px; \
        padding: 0px; \
        width: 20px; \
        white-space: nowrap; \
        text-decoration: none \
      } \
      #cozone_skin_change div span:hover \
      { \
        border : 2px dotted red \
      } \
    ');
    return (
      '<ul id="cozone_skin_change">' +
      '<li><img alt="" title="'+ CoZone.Locale.str('skin_change') +'" style="margin: 0px 1px 0px 1px;cursor:pointer;" src="'+CoZone.Skin.resourceURL('ButtonSkinOut')+'" onmouseover="this.src = \''+CoZone.Skin.resourceURL('ButtonSkinOver')+'\';" onclick="var menu = document.getElementById(\'cozone_skin_change_menu\'); if(menu.style.visibility == \'visible\') menu.style.visibility = \'hidden\'; else menu.style.visibility = \'visible\';" onmouseout="this.src = \''+CoZone.Skin.resourceURL('ButtonSkinOut')+ '\';cozoneSkinChangeCloseTimer = window.setTimeout(function(){ document.getElementById(\'cozone_skin_change_menu\').style.visibility = \'hidden\'; }, 1000);" />' +
      '<div id="cozone_skin_change_menu" onmouseover="if(cozoneSkinChangeCloseTimer) { window.clearTimeout(cozoneSkinChangeCloseTimer); closeTimer = null; };" onmouseout="cozoneSkinChangeCloseTimer = window.setTimeout(function(){ document.getElementById(\'cozone_skin_change_menu\').style.visibility = \'hidden\'; }, 1000);" style="z-index:999;">' +
      '<span id="cozone_skin_change_option-icon.blue" style="background-color:#7FC9FF;">&nbsp;</span>' +
      '<span id="cozone_skin_change_option-icon.orange" style="background-color:#FFA468;">&nbsp;</span>' +
      '<span id="cozone_skin_change_option-icon.green" style="background-color:#7FFF8E;">&nbsp;</span>' +
      '<span id="cozone_skin_change_option-icon.yellow" style="background-color:#FFE993;">&nbsp;</span>' +
      '<span id="cozone_skin_change_option-icon.forumboard" style="background-color:#E3E3E3;">&nbsp;</span>' +
      '<span id="cozone_skin_change_option-icon.silver" style="background-color:silver;">&nbsp;</span>' +
      '</div>' +
      '</li>' +
      '</ul>'
    );
  },
  getMyName : function ()
  {
    if (this.myData == null) 
    {
      return document.evaluate('/html/body/div[3]/div/div[2]/div[3]/div[2]/b/span', document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
    }
    else
    {
      return this.myData.name;
    }
  },
  checkUpdateScript : function () 
  {
    var updateTS = parseInt(GM_getValue("lastUpdateTS"));
    var updateTS = (updateTS > 0) ? updateTS : 0;
    if((updateTS + (CoZone.waitUpdateCheck * 60000)) < new Date().getTime()) {
      CoZone.httpRequest(
        'https://userscripts.org/scripts/source/'+CoZone.userscriptsId+'.meta.js', 
        this,
        this.responseUpdateScript);
    }
    else {
      var lastVersion = GM_getValue("lastVersion");
      if (CoZone.compareVersion(lastVersion, CoZone.currentVersionScript) == 1)
      {
        this.showUpdateScript();
      }
    }
  },
  showUpdateScript : function () 
  {
    document.getElementById('cozone_update_script').style.display = '';
  },
  responseUpdateScript : function (response) {
    var dateUpdate = new Date();
    GM_setValue("lastUpdateTS", String(dateUpdate.getTime()));
    GM_setValue("lastUpdateDT", String(dateUpdate));
    if(response.status == 200)
    {
      var lastVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(response.responseText)[1];
      GM_setValue("lastVersion", lastVersion);
      if (CoZone.compareVersion(lastVersion, CoZone.currentVersionScript) == 1)
      {
        this.showUpdateScript();
      }
    }
  },
  updateScript : function () {
    window.open('http://userscripts.org/scripts/source/'+CoZone.userscriptsId+'.user.js', '_self');
    var dateUpdate = new Date();
    GM_setValue("lastUpdateTS", String(dateUpdate.getTime()));
    GM_setValue("lastUpdateDT", String(dateUpdate));
    GM_deleteValue('lastVersion');
  },
  showManagerPlayedMatches : function ()
  {
    var X = 440;
    var Y = 220;
    var myName = this.getMyName();
    var divManagerInfo = document.getElementById('cozone_divManagerInfo');
    divManagerInfo.style.display = 'none';
    if (this.myData == null)
    {
      this.myData = CoZone.findManagerByName(myName);
      if (this.myData == null)
      {
        CoZone.requestManager(myName, this, this.onRequestManager, [CoZone, CoZone.showManagerPlayedMatches, [myName, null, divManagerInfo, X, Y]], X, Y);
      }
      else
      {
        CoZone.showManagerPlayedMatches.apply(CoZone, new Array(myName, null, divManagerInfo, X, Y, this.myData));
      }
    }
    else
    {
      CoZone.showManagerPlayedMatches.apply(CoZone, new Array(myName, null, divManagerInfo, X, Y, this.myData));
    }
  },
  showManagerNextMatches : function ()
  {
    var X = 440;
    var Y = 220;
    var myName = this.getMyName();
    var divManagerInfo = document.getElementById('cozone_divManagerInfo');
    divManagerInfo.style.display = 'none';
    if (this.myData == null)
    {
      this.myData = CoZone.findManagerByName(myName);
      if (this.myData == null)
      {
        CoZone.requestManager(myName, this, this.onRequestManager, [CoZone, CoZone.showManagerNextMatches, [myName, null, divManagerInfo, X, Y]], X, Y);
      }
      else
      {
        CoZone.showManagerNextMatches.apply(CoZone, new Array(myName, null, divManagerInfo, X, Y, this.myData));
      }
    }
    else
    {
      CoZone.showManagerNextMatches.apply(CoZone, new Array(myName, null, divManagerInfo, X, Y, this.myData));
    }
  },
  onRequestManager : function (context, action, params, managerData)
  {
    this.myData = managerData;
    params.push(managerData);
    action.apply(context, params);
    return;
  }
};

/********************************
// CoZone.ManagerPostTB
********************************/
CoZone.ManagerPostTB = {
  elemMessage : null,
  
  execute : function (cellsManager) {
    this.initGlobals();
    var id;
    var name;
    var cellManager;
    var anchor;
    var uniqueId;
    for (var i = 0; i < cellsManager.length; i++)
    {
      cellManager = cellsManager[i];
      anchor = cellManager.getElementsByTagName('a')[0];
      name = anchor.innerHTML;
      id = anchor.href.split('&')[1].replace('uid=', '');
      uniqueId = name +'.'+ id + '.'+ i;
      cellManager.innerHTML +=
        '<div id="cozone_ManagerTB.'+ name +'.'+ id + '.'+ i +'" class="cozone_skin_toolbar" style="float:left;">' + 
        CoZone.getToolbarButtonImg('ButtonQuote', 'cozone_opQuoteMessage.'+ uniqueId, CoZone.Locale.str('quote_message')) +  
        CoZone.getToolbarButtonImg('ButtonLink', 'cozone_opManagerShortcuts.'+ uniqueId, CoZone.Locale.str('shortcuts_of') + ' ' + name) +  
        CoZone.getToolbarButtonImg('ButtonLeague', 'cozone_opManagerLeague.'+ uniqueId, CoZone.Locale.str('league_of') + ' ' + name) +  
        CoZone.getToolbarButtonImg('ButtonMatchPlayedIn', 'cozone_opManagerMatches.'+ uniqueId, CoZone.Locale.str('played_matches_of') + ' ' + name) +  
        CoZone.getToolbarButtonImg('ButtonMatchNextIn', 'cozone_opManagerNextMatches.'+ uniqueId, CoZone.Locale.str('upcoming_matches_of') + ' ' + name) +  
        '</div>';
    }
  },
  initGlobals : function () {
    if (CoZone.locationOnSite == 'topicboard') 
    {
      this.elemMessage = document.getElementsByName('message')[0];
    }
    else if ((CoZone.locationOnSite == 'guestbook') || (CoZone.locationOnSite == 'leagueboard'))
    {
      this.elemMessage = document.getElementsByName('msg')[0];
    }
  },
  doQuoteMessage : function(nodePor)
  {
    var strPost;
    if (CoZone.locationOnSite == 'topicboard')
    {
      if(nodePor.className == 'separate')
      {
        strPost = nodePor.parentNode.parentNode.childNodes[4].childNodes[1].innerHTML;
      }
      else
      {
        strPost = nodePor.parentNode.parentNode.parentNode.childNodes[1].childNodes[2].childNodes[1].childNodes[0].innerHTML;
      };
    }
    else if ((CoZone.locationOnSite == 'guestbook') || (CoZone.locationOnSite == 'leagueboard'))
    {
      strPost = nodePor.parentNode.parentNode.childNodes[2].childNodes[1].innerHTML;
    }
    strPost = strPost.replace(/<u>-/gi, '<u>--');
    strPost = strPost.replace(/<\/b>/gi, '[/b]').replace(/<b>/gi, '[b]').replace(/<\/i>/gi, '[/i]').replace(/<i>/gi, '[i]').replace(/<\/u>/gi, '[/u]').replace(/<u>/gi, '[u]');
    var images = strPost.match(/<img src="\S+">/g);
    if (images != null)
    {
      for (var i = 0; i < images.length; i++)
      {
        strPost = strPost.replace(images[i], images[i].replace('<img src="', '[i]{').replace('">', '}[/i]'));
      }
    };
    strPost = CoZone.alltrim(CoZone.removeHTMLTags(strPost));
    var strMessage = CoZone.alltrim(this.elemMessage.value);
    if (strMessage.length > 0)
    {
      strMessage = strMessage + '\n\n';
    };
    var por = CoZone.alltrim(CoZone.removeHTMLTags(nodePor.innerHTML.replace('&nbsp;GB&nbsp;', '')));
    strMessage = strMessage + '[u]- ' + por + '[/u]\n' + ((strPost.length > 0) ? strPost + '\n' : '') +'-------------------------\n';
    this.elemMessage.value = strMessage;
    this.elemMessage.scrollTop = 8192;
    this.elemMessage.focus();
  },
  doManagerAction : function (managerInfo, context, action, X, Y) {
    var managerData = CoZone.findManagerByName(managerInfo[1]);
    var divManagerInfo = document.getElementById('cozone_divManagerInfo');
    divManagerInfo.style.display = 'none';
    if (managerData == null)
    {
      CoZone.requestManager(managerInfo[1], this, this.onRequestManager, [context, action, [managerInfo[1], managerInfo[2], divManagerInfo, X, Y]], X, Y);
    }
    else
    {
      action.apply(context, new Array(managerInfo[1], managerInfo[2], divManagerInfo, X, Y, managerData));
    }
  },
  onRequestManager : function (context, action, params, managerData)
  {
    params.push(managerData);
    action.apply(context, params);
    return;
  },
  doManagerLeague : function (managerName, managerId, divManagerInfo, X, Y, managerData) {
    var divManagerContent = document.getElementById('cozone_divManagerContent');
    var divManagerTB = document.getElementById('cozone_divManagerTB');
    var divTitle = document.getElementById('cozone_divManagerInfo-title');
    divManagerTB.innerHTML = CoZone.getHtmlManagerTB(managerName, managerId, managerData);
    divManagerContent.innerHTML = '';
    if (CoZone.sport_id == 1)
      divManagerContent.innerHTML = '<img src="http://www.mzplus.com.ar/imgdin_liga?user='+ managerName +'" width=400 height=146 />'
    else
      divManagerContent.innerHTML = '<div style="width:400px;height:146px;background-image:url('+GM_getResourceURL('LeagueDisabled')+');"><br /><span style="-moz-border-radius-bottomright:10px;-moz-border-radius-topright:10px;background-color:'+CoZone.Skin.style.backgroundColor+';color:'+CoZone.Skin.style.color+';opacity:0.6;padding:5px 10px;">'+CoZone.Locale.str('only_soccer')+'</span></div>';
    divTitle.innerHTML = CoZone.Locale.str('league_of')+ ' ' + managerName;
    CoZone.showDiv(divManagerInfo, X, Y);
  },
  doManagerShortcuts : function (managerName, managerId, divManagerInfo, X, Y, managerData) {
    var divManagerContent = document.getElementById('cozone_divManagerContent');
    var divManagerTB = document.getElementById('cozone_divManagerTB');
    var divTitle = document.getElementById('cozone_divManagerInfo-title');
    divManagerTB.innerHTML = CoZone.getHtmlManagerTB(managerName, managerId, managerData);
    divManagerContent.innerHTML = '';
    divTitle.innerHTML = CoZone.Locale.str('shortcuts_of')+ ' ' + managerName;
    CoZone.showDiv(divManagerInfo, X, Y);
  }
};

/********************************
// CoZone.Locale
********************************/
CoZone.Locale = {
  locale : 'en',
  resource : new Array(),
  
  init : function()
  {
    this.detectLenguage();
    
    this.resource['en'] = new Array();
    this.resource['en']['league'] = 'League';
    this.resource['en']['players'] = 'Players';
    this.resource['en']['played_matches_results'] = 'Played matches results';
    this.resource['en']['upcoming_matches'] = 'Upcoming matches';
    this.resource['en']['challenge'] = 'Challenge';
    this.resource['en']['guestbook'] = 'Guestbook';
    this.resource['en']['close'] = 'Close';
    this.resource['en']['played_matches_of'] = 'Played matches of';
    this.resource['en']['upcoming_matches_of'] = 'Upcoming matches of';
    this.resource['en']['fl'] = 'FL';
    this.resource['en']['friendly'] = 'Friendly';
    this.resource['en']['cup'] = 'Cup';
    this.resource['en']['league_standings'] = 'League standings';
    this.resource['en']['league_matches'] = 'League matches';
    this.resource['en']['league_top_scorer'] = 'League top scorer';
    this.resource['en']['league_message_board'] = 'League message board';
    this.resource['en']['manager_leagues'] = 'Manager leagues';
    this.resource['en']['manager_shortcuts'] = 'Manager shortcuts';    
    this.resource['en']['federation_fiendlyleagues'] = 'Federation friendly leagues';
    this.resource['en']['ads_federation'] = 'Ads federation';
    this.resource['en']['manager_matches'] = 'Manager matches';
    this.resource['en']['deactivate_federation'] = 'Deactivate federations';
    this.resource['en']['activate_federation'] = 'Activate federations';
    this.resource['en']['nonstop_last_page'] = 'Nonstop last page';
    this.resource['en']['to_add_your_federation'] = 'to add your federation';
    this.resource['en']['contact_me'] = 'Contact me';
    this.resource['en']['no_information_federation'] = 'No information of the federation';
    this.resource['en']['format_bold'] = 'Bold';
    this.resource['en']['format_italic'] = 'Italic';
    this.resource['en']['format_underline'] = 'Underline';
    this.resource['en']['format_image'] = 'Image';
    this.resource['en']['format_image_load'] = 'Image load';
    this.resource['en']['format_preview'] = 'Message preview';
    this.resource['en']['enter_link_to_image'] = 'Enter link to image';
    this.resource['en']['injured_suspended'] = 'Injured and suspended';
    this.resource['en']['training_report'] = 'Training report';
    this.resource['en']['training_field'] = 'Training field';
    this.resource['en']['tactics'] = 'Tactics';
    this.resource['en']['played_matches'] = 'Played matches';
    this.resource['en']['forum'] = 'Forum';
    this.resource['en']['update_cozone'] = 'Update ==CoZone-Script==';
    this.resource['en']['quote_message'] = 'Quote message';
    this.resource['en']['shortcuts_of'] = 'Shortcuts of';
    this.resource['en']['league_of'] = 'League of';
    this.resource['en']['transfers_monitoring'] = 'Transfers/Monitoring';
    this.resource['en']['only_soccer'] = 'Only for soccer, at the moment';
    this.resource['en']['skin_change'] = 'Skin change';
    this.resource['en']['confirm_set_skin_reload'] = 'You\'ve made changes to the skin in the script. Want to refresh the page to see the update?';

    this.resource['es'] = new Array();
    this.resource['es']['league'] =  'Liga';
    this.resource['es']['players'] =  'Jugadores';
    this.resource['es']['played_matches_results'] = 'Resultados de partidos jugados';
    this.resource['es']['upcoming_matches'] =  'Próximos partidos';
    this.resource['es']['challenge'] =  'Desafío';
    this.resource['es']['guestbook'] =  'Guestbook';
    this.resource['es']['close'] =  'Cerrar';
    this.resource['es']['played_matches_of'] = 'Partidos jugados de';
    this.resource['es']['upcoming_matches_of'] = 'Próximos partidos de';
    this.resource['es']['fl'] = 'LA';
    this.resource['es']['friendly'] = 'Amistoso';
    this.resource['es']['cup'] = 'Copa';
    this.resource['es']['league_standings'] = 'Estadísticas de la liga';
    this.resource['es']['league_matches'] = 'Partidos de la liga';
    this.resource['es']['league_top_scorer'] = 'Goleadores de la liga';
    this.resource['es']['league_message_board'] = 'Pizarra de la liga';
    this.resource['es']['manager_leagues'] = 'Ligas de managers';
    this.resource['es']['manager_shortcuts'] = 'Accesos directos de managers';    
    this.resource['es']['federation_fiendlyleagues'] = 'Ligas amistosas de la federación';
    this.resource['es']['ads_federation'] = 'Anuncios de la federación';
    this.resource['es']['manager_matches'] = 'Partidos de managers';
    this.resource['es']['deactivate_federation'] = 'Desactivar federaciones';
    this.resource['es']['activate_federation'] = 'Activar federaciones';
    this.resource['es']['nonstop_last_page'] = 'Ultima página sin escalas';
    this.resource['es']['to_add_your_federation'] = 'para agregar tu federación';    
    this.resource['es']['contact_me'] = 'Contactame';
    this.resource['es']['no_information_federation'] = 'No hay información de la Federación';
    this.resource['es']['format_bold'] = 'Negrita';
    this.resource['es']['format_italic'] = 'Cursiva';
    this.resource['es']['format_underline'] = 'Subrayado';
    this.resource['es']['format_image'] = 'Imagen';
    this.resource['es']['format_image_load'] = 'Cargar imagen';
    this.resource['es']['format_preview'] = 'Vista previa';
    this.resource['es']['enter_link_to_image'] = 'Ingrese el enlace a la imagen';
    this.resource['es']['injured_suspended'] = 'Suspendidos y lesionados';
    this.resource['es']['training_report'] = 'Reporte de entrenamiento';
    this.resource['es']['training_field'] = 'Entrenamiento general';
    this.resource['es']['tactics'] = 'Tácticas';
    this.resource['es']['played_matches'] = 'Partidos jugados';
    this.resource['es']['forum'] = 'Foro';
    this.resource['es']['update_cozone'] = 'Actualiza ==CoZone-Script==';
    this.resource['es']['quote_message'] = 'Cita el mensaje';
    this.resource['es']['shortcuts_of'] = 'Accesos directos de';
    this.resource['es']['league_of'] = 'Liga de';
    this.resource['es']['transfers_monitoring'] = 'Monitoreo de transferencias';
    this.resource['es']['only_soccer'] = 'Por el momento, solo habilitado para el futbol';
    this.resource['es']['skin_change'] = 'Cambiar skin';
    this.resource['es']['confirm_set_skin_reload'] = 'Hizo cambios en el skin del script. ¿Quiere recargar la página para ver la actualización?';
    
  },
  str : function(key) {
    var ret;
    var locRes = this.resource[this.locale];
    if ((locRes != undefined) && (locRes != null))
    {
      ret = this.resource[this.locale][key];
    }
    if ((ret == undefined) || (ret == null)) ret = key;
    return ret;
  },
  detectLenguage : function() 
  {
    var metas = document.getElementsByTagName('meta');
    var i = 0;
    var lang = null;
    var meta;
    while ((lang == null) && (i < metas.length))
    {
      meta = metas[i];
      if (meta.name == 'language')
        lang = meta.getAttribute('content')
      else i++;
    }
    if (lang == 'es') this.locale = 'es';
  }
};

CoZone.Skin = {
  currentSkin : null,
  style : null,
  
  init : function() 
  {
    var skinValue = GM_getValue('skin');
    if (
        (skinValue == null) || (skinValue == undefined) ||
        (['icon.blue', 'icon.orange', 'icon.green', 'icon.yellow', 'icon.silver', 'icon.forumboard'].indexOf(skinValue) == -1)
       ) 
    {
      this.set('icon.blue');
    }
    else
    {
      this.currentSkin = skinValue.split('.');
      this.initStyle();
    }
  },
  resourceURL : function(res)
  {
    return GM_getResourceURL(this.currentSkin[0] + '_' + res);
  },
  set : function(skin)
  {
    GM_setValue('skin', skin);
    this.currentSkin = skin.split('.');
    this.initStyle();
  },
  initStyle : function() {
    if (this.currentSkin[0] == 'icon')
    {
      this.style = new Object();
      if (this.currentSkin[1] == 'blue')
      {
        this.style.color = 'white';
        this.style.backgroundColor = '#7FC9FF';
      }
      else if (this.currentSkin[1] == 'orange')
      {
        this.style.color = 'white';
        this.style.backgroundColor = '#FFA468';
      }
      else if (this.currentSkin[1] == 'green')
      {
        this.style.color = 'black';
        this.style.backgroundColor = '#7FFF8E';
      }
      else if (this.currentSkin[1] == 'yellow')
      {
        this.style.color = 'black';
        this.style.backgroundColor = '#FFE993';
      }
      else if (this.currentSkin[1] == 'forumboard')
      {
        this.style.color = 'black';
        this.style.backgroundColor = '#E3E3E3';
      }
      else if (this.currentSkin[1] == 'silver')
      {
        this.style.color = 'black';
        this.style.backgroundColor = 'silver';
      };
      GM_addStyle(' \
        .cozone_skin_toolbar \
        {	\
          color:'+this.style.color+'; \
          background-color:'+this.style.backgroundColor+'; \
          -moz-border-radius-topright:5px; \
          -moz-border-radius-bottomright:5px; \
          margin:0px 2px 0px 2px; \
          cursor:default; \
          height:16px; \
          padding:1px 2px 1px 1px; \
        } \
      ');
    }
  }
};
CoZone.execute();

