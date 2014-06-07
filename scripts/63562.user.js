// ==UserScript==
// @name          Lectio-fixxer
// @author        Atnas
// @version       0.3
// @description   Laver de kedelige sorte tekststykker til sjove links, og gør beskeder mulige at bruge med faneblade
// @include       https://www.lectio.dk/lectio/*
// ==/UserScript==
var DisabledList = document.evaluate("//*[@disabled='disabled']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0;i<DisabledList.snapshotLength;i++)
  {
  var EnableMe = DisabledList.snapshotItem(i);
  if (!(EnableMe==document.getElementById('s_m_ChooseTerm_term')))
    {
    EnableMe.href = location.href;
    EnableMe.removeAttribute('disabled');
    EnableMe.style.fontWeight='bold';
    }
  }
var Navigation = document.getElementById('s_m_Content_Content_ListGridSelectionTree').getElementsByTagName('a');
for (var i=0;i<Navigation.length;i++)
{
  GM_setValue(i, Navigation[i].getAttribute('href'));
  Navigation[i].href = location.href;
  Navigation[i].addEventListener("click", whenclick, true);
}
if (location.href.indexOf('beskeder2.aspx')>-1)
{
  var alltitle = document.getElementsByTagName('h4')
  if(alltitle.length>0)
    document.title = alltitle[0].innerHTML + " - " + document.title;
if (GM_getValue('newtab')=='')

{
  var menu = document.getElementById('s_m_Content_Content_tl').getElementsByTagName('a');
  for (var i=4;i<=menu.length-1;i++)
  {
	GM_setValue(i+Navigation.length, menu[i].getAttribute('onclick'));
	menu[i].removeAttribute('onclick');
	menu[i].addEventListener("click", whenclick, true);
  }
}
else
{
  location.href = GM_getValue('newtab');
  GM_setValue('newtab','');
}
}

 function whenclick(event)
{
  var msg = '';
  for (var i=4;i<=menu.length-1;i++)
    if (menu[i]==event.target)
      msg = "javascript:void("+GM_getValue(i+Navigation.length).substring(11,60)+");";
  if (msg=='')
  for (var i=0;i<=Navigation.length;i++)
    if (Navigation[i]==event.currentTarget)
      msg = GM_getValue(i);

  if (event.ctrlKey)
  GM_setValue('newtab',msg);
  else 
  location.href = msg;
  return false;
}
