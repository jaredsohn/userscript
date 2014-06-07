// ==UserScript==
// @name           Enter LOTRO Lottery
// @namespace      http://userscripts.org/users/295723
// @description    Enters specified characters in LOTRO lotteries
// @include        http://my.lotro.com/home/lottery
// ==/UserScript==

  // This GreaseMonkey script only runs when the URL in the address bar is http://my.lotro.com/home/lottery.
  // It requires you to already be logged on to the LOTRO Community site.
  // It will NOT switch between multiple subscriptions on the same account,
  // nor will it automate logging you into multiple accounts.

  // If you wish to only enter specific characters in the lotteries, add their 18-digit character IDs
  // between forward slashes in a comma separated list to the array below. Otherwise, leave it blank.
  // You can find the character ID at the end of each character's URL on myLOTRO.
  // For example,
  // var characterIdsToEnter = [/123456789012345678/, /234567890123456789/, /345678901234567890/];
  var characterIdsToEnter = [];
  
  // The first form on the page (.forms[0]) is always the search box form.
  var lotteryForm = document.forms[1];
  
  // If there's more than one form, the second one is always the unnamed lottery entry form.
  if (lotteryForm)
    {
      // Loop through every element in the form.
      for(var currentElement = 0; currentElement < lotteryForm.elements.length; currentElement++)
        {
          // If the element is a checkbox,
          if (lotteryForm.elements[currentElement].type == 'checkbox')
            {
              // and if the user specified a list of character IDs,
              if (characterIdsToEnter[0])
                {
                  // go through the list of character IDs,
                  for(var currentCharacterId = 0; currentCharacterId < characterIdsToEnter.length; currentCharacterId++)
                    {
                      // and see if the checkbox matches to one of those character IDs.
                      if ( lotteryForm.elements[currentElement].id.match(characterIdsToEnter[currentCharacterId]) )
                        {
                          // If it matches, check the box.
                          lotteryForm.elements[currentElement].setAttribute('checked', 'checked');
                        }
                    }
                }
              // Otherwise, if the user didn't specify a list of character IDs,
              else
                {
                  // then just check every checkbox.
                  lotteryForm.elements[currentElement].setAttribute('checked', 'checked');
                }
            }
        }
    }