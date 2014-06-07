// ==UserScript==
// @id              tweakgametrailers@httpwww.brainassassin.com
// @name            Tweak Gametrailers
// @namespace       http://www.brainassassin.com/
// @description     Removes age verification, disables autoplay, shortens title and fixes layout errors.
// @author          JC2k8 http://userscripts.org/users/JC2k8
// @homepageURL     http://userscripts.org/scripts/show/49609
// @version         3.2.0
// @include         http://www.gametrailers.com/*
// @noframes
// @require         http://userscripts.org/scripts/source/87345.user.js
// @require         http://userscripts.org/scripts/source/98574.user.js
// @require         http://sizzlemctwizzle.com/updater.php?id=49609&days=7
// @icon            data:image/png;base64,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
// @icon64          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AABV2SURBVHhe1ZsHWJbl98dR06zULEvTVNyWqWmaZcN2tMtKsz0sK21alpmZlm1HmStNUcStYAIqorL3nrLcCq5wZNn6df7nc+jhjyjyAvIfz3Xd1/sCz/s+9/neZ3zP976p5fZ/8Nq9e7f8+uuvbiLidu6557q1bt261v/6NPNz8yUtJV3SUtMlIy1T0vWV93m5ebJ79x45UxMMDg6Wt99+W1577TUZNmyYDd5/8cUXEhAQcMae4/J8/f0CZHNWthw7dkz+/vtv+c9//mOvjD///FOO/XJMCgsKJTsrRzZnZld7glOmTJGnnnpK3nzzTXnppZfkxRdftDF48GB54YUX5OWXX5b58+dX+zkuA3DNNddIWEiY/Pbbb/LPP/8YAA4If/31l4Hw+++/y/Hjx+XQocOSm5MnOdm5VZ5gUFCQ8Mz27dvLgAEDzPhnnnlGnn76aQOG8eSTTxoQkZGRVX6OywDcf//9MuixQZKSnCp//PGHGY/hDH5mAA7jl19+kaNHj8oeDQlCxOWHlLkREL777ju58cYb5aqrrpLHH39cBg4caIAwHn30UXnkkUdszJ49u8rPcWl+CxYskNtvv13GjR0n+Xn55vrOymM8q4/xhAjGHzlyRIqKiqSwsFBSU9KqPLmcnBxZu3atDB8+XC6//HJhIR588EF54IEH7D3jvvvuk/79+8uIESNk27ZtVX5WhUB88803cuedd4rXPC/Zs6egZOVxe8d4Vv/w4cMaBofk4MGDsn//ftm2dZuEh0VUa2JxcXEyYcIE6d69u9x2223i4eFhc2GwMAx+9+yzzxpgFRpT1Rs++OADdb0Bsj4wSH7++eeSlddyZa7PymM8f8P4vXv3Klh7ZN2adbJ9+/ZqTSw7O1tYhCuvvFL69esnN910kw3eEyY33HCDvRISEydOrNazysVn8+bN8sYbb8iwocMkNjrO3B3jcX3HeFb+wIEDZnxBQYHs3LlTUlJSxdfHt9qTIiRweRJknz59bFx99dU2evfubYN8ccstt1i1SE5OrtozY6Jjy/0gNfrVV1+Vz8Z/JhnpmSVJD9cn7jF+3759ZjxkZseOHZKfny/Tp82o2mRKLUdSUpJ5QI8ePeyVQVgwunXrJl27dpUrrrjCBr8DiDlz5lT+uT/MnCUJcQnlfnDJkiVWgtb4rzV3x3heWX2MJ/nt2rXLjN+6davk5eUpANMrP5EyvsgzL7vsMhudO3e20alTJxsdOnSwQelktG3bVtq1ayddunQxb2BBXA79yZMmmzE+K33UiJ2n/ODUqVNl0cLFZmzppOfEPa5PVsZ4XHfxoiUaFvtcn0SZ2aalpUnHjh3NMEabNm3E3d1dlCLbaNWqlbRs2VIuvfRSGy1atCgZ/J7QoLS6BMLoD0fLgf0HzKXnz/eSpKRTx9KcH+fKju07Tkp6jvG4PsZnZWVpDlhl3MClCZziJsIOo5o3b17yyvtLLrnEfld6OMY7QDigANikSZMqnsPwt4fL9m1q2EF1b2V2q1at0lIWftIHw0IjNMntOiHucX0y/pYtWyQ3N9eMj4iIkCXqAQVaPqsKAOUPV2e1HYNYWQar7wzHI3jFYAbewsBzYJEVzmHEiPeUwKQavz9w4KDFeFxsnARvCj7hw4V79p7WeKoGNdxnha8EBW6o+MGnmRlsb/z48Vbze/bseYJhGHfRRReVhIiTC5y8QOiQL3iFQlcIAA9aq7Wb+GfVCAc4PqsZEx1jXxAWGm4Jj3pPHnAyvpP0qNspKSkS4LdGwYuXzIysih98mpmRUMPDw+W5556zmg8IeAQJD+MbN24sffv2lV69etnv+btTEagQlMqLL77YOsoKAVi9erV88fkX1tQQCnt2F1gC8/Hx0dY3V+bM/lGyMrPMcLIrZCcjI0NW//ST3QNQ6enpsiFoo8RExVjsZ6RlVPzgcmZGOAHm119/LXfccYcRomuvvdZWtUmTJpYHIEUAQLIj++P6t956q/3unnvusVDh/k2bNrk2jyeeeELi4+LV4HzN5tslVkNgzZo1slRL4PLly5XibjWSUzrmZ86caUBARzdu2GRkqRjAPaYbVIj8KW6gigDArFmz5KGHHpJPPvlEeA4AkAsw9OOPP7aG6PPPPzcgyAcXXHCBNGvWzPoFeANJ8q233nJ9DmTd2brS2ZtzjPB4enpaPC9cuFAoSZlqKEmOya1VYAIDA2XcuHHG2efOnSsfaiUJCw3ThLhDdmmiTElKdf3h/wJBGQXgZcuWGc9HD1i6dKnF8bfffmsGTZ482byNj3A/5ZnmCM8gLM4//3y58MILrZOkIrm8CL6+vtZyJiUmywKvBRIaGirz5s0zEHBHWBmv0dFRsnLlSkHEICeEhIRYpr355pslIjxCPWW7lcrkpBTXH66zhE9g/Pr1681QOkBC87HHHrNQYBEIt1P1GCzSK6+8Yt4BCMyFBXLZeOdGOqxJSopoh/lSXDsqKkri4+MNCMrbCg0HRAkvLy9zT5IMzQjtaXpaumzJ32IdIUBWZgKsZmxsrIwdO9binpXHC+x7/13x030fsT5y5EgD7ocffqjUs0u+l1UFSZAGAFaDXoBsHLhunQ3+jssTq35+fnLvvfeqW34rP/74o8pom00/2LJlqyQnVuwBfAegowfiXTyfBMbru+++K4MGDaqUAgQRw2srA/xJ9xL7NBSQIVyQRAilxFhcn3K3aNEii8/nn39e3nnnHUtGJD9Gbk6ugpNfYQhER0fLddddZ1mbRub666838YPvI95pdXl2ecZs314g8Ym5EpeQJ3n5p6bvVQICADAUAJyBR7AqiJaLFy+2sJg+fboMHDBQ1qlX4CUkzx3btR9Q9weE01UBvpdWFiMxnAxPZ0eWHzNmjHV6eGBZAzaGZMnrH6bKnU9tEY/njkr/oSID3xQZ8PpxGThsj4wYnyP+gdUQaYl5AGCCJEUGYLDi5AXq/Zdffmlui2DJmOc5z2gzMY8wShUgBKgk8IqyRgAcpAVhA4KD8ZAWShcyWIMGDQQhpvTnMrK2i8cT8dLpjuNy4+MiDw8TGTxK5M3xIiO+Enn3S5HXxok8M0LkviF/y8NDciQ4vBIVwHnY+++/r+XsQwMBw1l5XlesWCG0xPyeUHj99dct8fE3Bl5ABUhJTrHVh0iRDJMSTkyEgAdzo29n9QkBRA7IDGEAodFNESt1zpyW+qZJo+67pFU/kWsHFBs/dKzImO9EJs4RmeYtMnWByFezREZOKAbmnhdFej5wVL6aEle5fID7PfzwwzJ06FD5/vvvbeUhQQx0eX6Hbg8RoVQ5ecEHENau05hdq1Q4wDrBqMho20xJjE+ySXAvbg9bY/UxHqUH4xE6WH1qOGFAiPGZ5avSpW7nA9Kgh0iXu0U8Xig2EOOnLxRZtkbEP1hk9UYR759EJnuKvPe1yJPviPR7QqTNzb/LqM8qIaMzySFDhpgMTf396KOPrKSQ9adNm2avgOEkSH9/fwMBDzGApnwvU1Ta3rhhg963THuCWCNEMESqhWO8E/cAguvD4WFzDRs2tD0B5LbsnJ3S4Iod4tZJpEkfkV79xWIet2flMT48XiQ9RyQ5SyQoUmS+r8j46SJDRheDdfldIud1OypLfSpRkqG2hAGqClkZj6AhYbuKOsvqU7bwEt5jOD0BmXuht7dS43TlA6nKwrK1w0zUcphooeC/OsBoqhP3pY2Hs5933nnWvUGsuG4bqDKdGl+r45/S9OrD0vvBIun/SpG8MbZIJswqkqV+RRKfekwK9v4m2XmHZEN4kXguK5JPphTJSx8UicezRdLFo0gadDskl/SqglTvrca89957ZjirQq8AII48fffdd1vNBiDIyjSlpHSVWVnq9gnxSl7SlDrnqBdEmycQCr4rV1l7S9IjEZLtkbvg7TA4cgvCa0h4ltRqf0TcLp4k9c7tKO5t2pX0+E6vz2ur1u5yqTY9jmJU+m/Oe/c2baV+w67y4fgqMENoJ1wAkkPSoyuD+7PyTBbjaUZgX59++qkKp+MtTJKSEiUhIU4rQZp5QkR4qERFRKrumCgrl/uYF2A8cU97W79+fcsFMEyu599OVOMnao641qhveRdJmVxU0cU2W6tuUyuXEMsjEbA3khQVAsIEMFBW3JswAAh/zQvR0ZGSmBhvIZGbm615Yb2Eq6YQH5tg2qLTxxP3ZH/Ci9XnatknUeqd08o0B67iPchDJw3yEk2c8zf2Kpyr9P3ktFrNVyhB05xypi94OqWQhoi8wf7el9ofBCmNjooMt3DIVBBysjdLgP9qCQ0OkbiYePH28ja5C/cnvBISEmzuhYX7pLZ7nFaGniXGoPTWqdda6tV3l3MbuEuDRu5yfuM20qJlT2ndto9c2KStNGzU3Jog53Jzqy2167qLW9324nbeg+LW/rD4+hVXpBq5qATE96hRo+Q79YTvlTkGrQ+U6KgIDYkEycwsBmHliuUKQqjlBM85nta2UklYZa7kFCUw7llWHZyL/FC/yzFp2nW1tOvtKd37zZW+Hp5y96AAeXXMcRmmJOihF5JOAKB2nfOlzmV62kITqTNmzqtENagKSrStrAJ5YpKGBiGyPnBtMQiJgJBhSXLRQm8J1e13eAJCCjKbcyUlK5VtczIAbk3GWZgR884gIV/R91u59yUlSfefCIBb7cYnGA8IMzxrGADyAaWM5AhpgtHN1+6M+I/RnJCcnKgAZMjmzVniOXeOxMbEKmPcan0Eu89cBQX7pFarmJM8wK3RYKPmpS+S4EVth0vXe5X09K0YgJWrazAE0AwcCZvGhvKJWkNi9PKarwqz6oUqpiRrhcALKJOzfphpGkLhnkLJzc6zbXiuZt0DNQf8dwig9rjV62r7lBiNEMvF+3oXvyUNNV2c3aECANoflJzcGtxOp4w5GxPOzgyCCSDQAPn4rFC33yQxMVHa+yepdlAMwlT1FCrLoaJDpkcCwqODg6VpszZ2MIMLPQJjGQgxbM9zUXHcLvqm2NVbJ5+YBMuEQIcba3D1SWTODg6KLeIk3kA+IAwAAca4bu0aZXoqnsZEa+OkIGgowBkm6+5NgSrNv+jZo7zcLbJ+o2p+DR4yA8u70Cabt9As30aP5gCAe1oZAC4slQP+kXETyt/7rEq+K/kMYghGs/qAgPFNmzY17Z76jqoDADNmzNAewlel80AVT4NV/opWqpys8Z+lYCRrYlxoyZBNGTyht4e/1DrnausaSyc+3sM7Gl/QUtya6VEZJ8u32y8tW7Uvudft7KtK/takR9XPL50WHPQDjMflnZVnMwLjUWZ5ZdMCeYukiFy1PnCdJcVQBSEuNqYYBC2P6Sp6LlMdEPKzT/ckUtK2Sv3OqvS01pb2Em811vPfoZJXCz+t60UnZXm31irDcW/zJeLWdnfx3zv+JnO9a2D1oai0tLg6m5MAwMoDAEkLANDqGdR0tACYG51kcPDGYmYYpqQoLkbVoxTjCGnaRCG6Iqggr81bnCR1Oh062dBStb10nT/pfce/5JURoTVDfoh71Fsy/qmMh7zQ4cHz6fbY7MQLACEsLFQ2bQwqASE+LrYYBO0bSIy+SrMz0rVc6hnE2V5KizsXVhqEWh2OybD3w2rGeNgeqg5G0dsTAqVdn1Vv1KiR1K1b1w4xkAidYyyAQHMF9cULGDRL8fGx1kbnKgj0D3hKQjztdIrExOVJt9s1i+uKnnbFzTP+kWa9ssR7WQ1lfaQxjEYXRNlB1cULnLjHeJSds846yzyDltoOTKiYiuw1evRoA4TdH9hh0HpyQpCWulA1OM7CgDYaEPxW+0lkRJT1Dmy2LlqRIrcOjNfckK9g/F4KjL+lToed0sMjQSZO106ypi60e+Keg0sYDxDIWnR2eAFxj+ufffbZFvt0YewoMR92ftj0QAOEKkObET+ioyLNCwiJyIiwkjYaECBMawLWaCutmoKCkJW5ucS46JgMWfFTsqo9SRISlmYMsqbsLvneu+66y3p/NABH1sJ4khzCBgCcc845NlB7y25PoSpTFvkOQGBXiZNdIZoU8QQHhNKCCiAErQ8qAaG62+5VBglViGYEXY/ajOuXVnYQN+AATtyXt0PDFhafhSpDdOgfMrSldvJB8KYNxW20agm00Xl5uVYmQ0JCdes99iRPqLJBlfkgfJ7OCw8obTz011F2ID2sPCURV+cMQXnPoEvEa1CWyBH8nKj5AJKEJwBCpIJAjiAXOCBERUaVgPA/5gkbVOHF5dmrLy1n4/rI2YgVkB02NNDmEEsRVk8HMLvA6Ih8Hzoi8hrSW2REuIGANwCCoyVkaRsNCOSFBDZq9QRK2ZxQmQV1+V66Llweibxs0sN45GyMh/gwEE3ZJnPlASRUQIVPsBPEmUCaHgx3PIHcAAh0kGgJ+fl5BgLnmRwQ+L8GV55XpXuYHHIVIJSVsyl9JD5cnt0cZG5KXWUexL4C+YA9RwDAE9iGxwMcTwAEPGP+/HnWU4SHhylTzFdAskxkxRN27VLae6YvVgUAqPenSnoYj/Rcr149O5iAYlyVObDpSmmEXHFAg/wRp8yQXOB4wpgxH9mOFFvzLEiEAgIIudk5tulS2cMYFc6T1pWdHOr4qfbwiHsYHkkP0kPcV+o4SqkZ0NYidKAnogxz3IUKwqrjCf5+qw3cn3TzhTzB2SH2LAgHEm2ybsqiNFdolKs3sOq4Ny6N0ksCLL2H5yQ9qC6rT3Ugdl39/lPdFxMTY/mA/xIBDM4EcSYBAWVNgJ/yg432rztcHOkN1lKKlkD7nKb/oEEYVOf5J3yWmHTO3bFpQQjA/ihbTtxT7+vUqWNewF7hmXg40jqJljyAR7H9lqCSenHTFGT7heiGaP/p6amSmposRw4fkS15WyUyvHgz9YxcnNAgpiE2rC4iBxmfrSzink1MjIfqunQOtxKzgm/AMNmbJDHy/anaJRIKYaEhVg0IjTBto2mcfj5YJHsL9qvGUL1TqSdMEe7O/+wQAgBBx0ejAxB4BG4P12eCZ/p/dtAGWQCeCT8gIeJhMEKqQTE/2GgEiZNolEIkNM+5KpacyYvToDQrUF/4vcPy6PAY/J64PZPPdL6Ls0PkADgFNJkqwaZLou4yZ2Vm2v7h4kWLZeaMmXom2Ufm6uYK+5E1MRc3zulQfmhr4fi1a9e2lpZevUYe+O+Xwg/oOEmKtM6IKHAAXqkIsMhRWqZHvj/SDmrRZNXYfMjwxCSsDxBq7B+UyljAmSS24EnCNE6cXqF54pXGjK15qlS1j8W5ghy1mgTF0ThES1c+U917OJgNs6Qa0D7DE5DgCD82YckPNeb65U2+SsdPq4kEfICzSqw0XSNyGkSIU6XV/Or/Xx93juqfiVn/F13rjQshElsAAAAAAElFTkSuQmCC
// ==/UserScript==

(function () {
  // Scriptish users don't need this line because of @noframes
  if (unsafeWindow.top !== unsafeWindow.self) { return; }

  // VARIABLES --------------------------------------------
  var $  = unsafeWindow.jQuery;    // GT uses 1.4.2.min

  // Config -----------------------------------------------
  devtools.config.init({
    title: 'Tweak Gametrailers Preferences',
    settings: {
      'trimTitle':     { type: 'checkbox', label: 'Shorten the long title', defaultValue: true },
      'noContinuous':  { type: 'checkbox', label: 'Disable continuous play', defaultValue: true },
      'showDownRated': { type: 'checkbox', label: 'Unhide downrated comments (and show in red)', defaultValue: true }
    },
    // style the preferences menu
    css: '#devtools-wrapper .dialog { border:2px solid black; border-radius: 6px !important; box-shadow:5px 5px 15px #000000 !important; width: 300px !important; padding:0 !important;} ' +
         '#devtools-wrapper .dialog input[type="checkbox"]{margin-bottom:10px !important;} ' +
         '#devtools-wrapper .dialog .dialog-title { border-radius:5px 5px 0 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-close {border:0 none !important; border-radius:0 5px 0 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer button {border-radius: 0 !important;} ' +
         '#devtools-wrapper .dialog input[type="checkbox"] {margin-bottom:5px !important; margin-right:5px !important;} ' +
         '#devtools-wrapper .dialog .dialog-content {border-top: thin solid black !important; padding:15px 10px !important; margin:0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-title span {font-family:Verdana,Arial,sans-serif !important; font-size:13px !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer {padding:5px 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer button:last-of-type {border-radius:0 7px 7px 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer button:first-of-type {border-radius:7px 0 0 7px !important;} ' +
         '#devtools-wrapper.mask {background-color:rgba(0, 0, 0, 0.7) !important;}'
  });
  // register menu command to access preferences
  GM_registerMenuCommand('Tweak Gametrailers Preferences...', function() { devtools.config.open(); });

  /**
   * This is where the script really starts. Determines the current page and calls
   * functions accordingly. Also shortens the title.
   */
  function Main() {
    var SITE_TITLE = 'Gametrailers.com',
    uri = window.location.href,
    mainSite = /^https?:\/\/www\.gametrailers\.com\/$/i.test(uri),
    searchPage = uri.search(/\/search\.php\?/i) !== -1,
    docTitle = "";

    if (uri.search(/\/(?:user-movie|video)\//i) !== -1) {
      // User movie or video
      compactVid();
      buildPlayer();

      // Disable continuous play
      if (devtools.config.get('noContinuous')) {
        var cont = $('#ContinuousPlay');
        // pre-1.6 attr still returns "true/false"
        if (cont.length && cont.attr('checked')) { cont.click() };
      }
    }

    addStyle();  // add global styles

    // shorten the title
    if (devtools.config.get('trimTitle')) {
      if (mainSite) {
        document.title = SITE_TITLE;
      } else if (searchPage) {
        document.title = SITE_TITLE + ' - Search';
      } else {
        docTitle = document.title.replace(/ Video Game,/, ':');
        if (docTitle.indexOf('|') !== -1) {
          document.title = docTitle.substring(0, docTitle.indexOf('|')) + ' - ' + SITE_TITLE;
        }
      }
    }

    // Page-specific actions/styles
    if (mainSite) compactMain();
    if (searchPage) fixSearch();
    if (uri.search(/\/usermovies\.php/i) !== -1) fixUsermovies();
    if (uri.search(/\/achievements/i) !== -1) compactAchievements();
    if (uri.search(/\/game\//i) !== -1) compactGameSite();
    if (uri.search(/\/game-reviews/i) !== -1) compactGameReviews();
  }

  /**
   * Bypasses age verification and stops autoplay.
   */
  function buildPlayer() {
    unsafeWindow.buildPlayer();
    window.setTimeout(function () {
        var player = $('#mtvn_player');
        if (player.length) {
          player.children('param[name="flashvars"]').val(player.children('param[name="flashvars"]').val().setAttr('autoPlay', 'false'));
          player[0].data += '';
        }
      }, 150);
  }

  /**
   * Removes the age check by selecting a date that makes the user at least 18 years old.
   */
  function remAgeCheck() {
    $('#ageCheckMonth').attr('selectedIndex', Math.floor(11 * Math.random()));
    $('#ageCheckDay').attr('selectedIndex', Math.floor(28 * Math.random()));
    $('#ageCheckYear').attr('selectedIndex', Math.floor(14 * Math.random()) + 15);
    $('#AgegateLayer input[type="button"]').click();
  }

  /**
   * Makes the main site more compact and removes some ads.
   */
  function compactMain() {
    addNewStyle('.tgtNewDivider {background:url("images/gt6newestDivider2.gif") no-repeat scroll 0 -2px transparent; clear:both; height:6px; margin-left:43px;} ' +
                '.alertbox {width:100%;} ' +
                '.alertbox .text {width:180px;} ' +
                '.alertbox .copy {padding-top:5px;}');

    $('.newestlist_content > div[align="center"]').addClass('tgtNewDivider').removeAttr('style').removeAttr('align').empty();
    $('.alertbox').prependTo('.right_content');
    $('#TOP_ADROW, .ad_box_div, #ad_frame_countdown3, .newestlist_content .clear_both, .center_content a[name="newest_anchor"] > img').remove();
    $('.right_content img[src$="spacer.gif"]').slice(0, 2).remove();
    $('div[id^="minimassive"]').css('margin-top', '5px');
  }

  /**
   * Makes the video site more compact and fixes some annoyances.
   */
  function compactVid() {
    addNewStyle('div.SearchAjaxFooter {margin-bottom:5px;} ' +
                '.alertbox {width:300px;} ' +
                '.alertbox .text {width:180px;} ' +
                '.alertbox .copy {padding-top:7px;} ' +
                'div.SearchAjax.SidePanel {margin:0;} ' +
                'div.SidePanel {margin:0 0 5px;} ' +
                '.Bottom {margin-bottom:5px;} ' +
                '.comment_container {margin:2px 0;} ' +
                '#comment_block div[id^="comment_"] .comment_box_top {padding-left:7px; padding-top:7px;} ' +
                '#comment_block div[id^="comment_"] .comment_header {width:560px;} ' +
                '#comment_block div[id^="comment_"] .comment_header .comment_thumbs {margin-right:2px;} ' +
                '#comment_block .comment_container:last-of-type {margin:2px 0 5px;} ' +
                '#comment_block .comment_container:last-of-type .comment_box_top {padding-top:5px;} ' +
                '#comment_block .comment_container:last-of-type .new_comment_title {margin-bottom:5px;} ' +
                '.comment_avatar_container {margin-top:3px;} ' +
                'iframe[src*="dlcount_iframe.php?"] {display:none;} ' +
                '.tgtDownRated {color:rgba(255, 0, 0, 0.7);}');

    $('#RightAdvertisement').before($('.alertbox')).remove();
    $('#TOP_ADROW, .SearchAjaxFooter + img').remove();
    $('#RegularPlayer').parent().before('<div class="topSpacer" />');

    // Fix the missing rounded bottom corners when submitting a comment
    $('.comment_container:last-child .comment_box_body', '#comment_block').after('<div class="comment_box_bottom" />');

    // Unhide downrated comments
    if (devtools.config.get('showDownRated')) {
      $('#comments_pages > a').click(function() {
        window.setTimeout(function() { unhideComments(true); }, 300);
      });
      unhideComments();
    }
  }

  /**
   * Unhides downrated comments and marks them read. Adds the event listener
   * to the newly loaded (jQuery.load) links to enable this function again.
   * @param {Boolean} addListener Add the listener or not
   */
  function unhideComments(addListener) {
    addListener = addListener || false;
    $('#comment_block').find('.comment_text > a[href*="showHiddenComment("]').each(function() {
      var comment = $('#comment_' + this.href.match(/\d+/i));
      comment.find('.comment_avatar_container, .comment_username, .comment_date, .comment_thumbs').removeAttr('style');
      comment.find('.comment_text').addClass('tgtDownRated').html(comment.find('.comment_hidden_body').html());
      comment.find('.comment_thumb_score').addClass('tgtDownRated');
    });
    if (addListener) {
      $('#comments_pages > a').click(function() {
        window.setTimeout(function() { unhideComments(true); }, 300);
      });
    }
  }

  /**
   * Makes the usermovies site more compact, fixes the layout and re-arranges stuff.
   */
  function fixUsermovies() {
    addNewStyle('.rightthin_content {margin-left:5px; width:219px;} ' +
                '.centerwide_content {width:806px;} ' +
                '.um_top {float:left; width:588px;} ' +
                '.reviewlist_browsebox {float:right;} ' +
                '.reviewlist_platfiltbox {margin-right:5px;} ' +
                '.um_column {margin:8px 0  0 3px; width:192px;} ' +
                '.usermovie_desc {overflow:hidden;} ' +
                '.reviewlist_toptitle {padding-top:9px;} ' +
                '.leftnav_container {padding-left:1px; width:185px;} ' +
                '.alertbox {margin:2px 0 10px; clear:both;} ' +
                '.alertbox img {margin:8px 0 8px 7px;} ' +
                '.alertbox .text {margin:5px 0 0; padding:0 5px; width:110px;} ' +
                '.alertbox .copy {padding-top:3px;} ' +
                '.page_content, .centerwide_content {width:812px;} ' +
                '.page_middle {margin-top:5px;} ' +
                '.um_top_bottom {background:url("/images/gt6ReviewMain_04.gif") no-repeat scroll 0 0 #E9E6E5; background-size:100% 12px; clear:both; height:12px; padding-bottom:5px;} ' +
                '.leftnav_box {display:block; float:none; margin:10px auto 0; width:165px;} ' +
                '#tgtRightContainer {float:left; margin:0 auto; width:215px;} ' +
                '#tgtRightContainer .leftnav_shows_bg, #tgtRightContainer .leftnav_shows, #tgtRightContainer .leftnav_shows_bg { background-size: 100% auto; width: 215px;} ' +
                '#tgtRightContainer .leftnav_shows + div {margin-bottom:10px;} ' +
                '#tgtRightContainer .leftnav_show_textbox {width:200px !important;} ' +
                '#tgtRightContainer .leftnav_release_texttitle_left, #tgtRightContainer A.leftnav_release_texttitle_left {width:155px;} ' +
                '#tgtRightContainer .leftnav_release_texttitle_right, #tgtRightContainer A.leftnav_release_texttitle_right {width:40px;} ' +
                '.reviewlist_column_topitem {margin:7px 7px 5px;}');

    // let's make the rightbar a tad more usable
    $('.rightthin_content').empty().insertAfter('.um_top');
    $('.alertbox, .leftnav > .leftnav_box').appendTo($('.rightthin_content'));
    $('.leftnav_box img, .reviewlist_platfiltbox').removeAttr('style');
    $('.leftnav img[src$="spacer.gif"]').slice(-3).parent().remove();
    $('.leftnav > div').slice(-11).insertBefore($('.rightthin_content > .leftnav_box')).wrapAll('<div id="tgtRightContainer" />');
    adjustIMG();
    $('.leftnav_shows > .leftnav_shows_bg', '#tgtRightContainer').removeAttr('style');
    $('#TOP_ADROW').remove();

    // fix the broken columns layout
    $('.um_column').not('.reviewlist_columns > .um_column').each(function() {
      $(this).insertAfter('.reviewlist_columns > .um_column:last');
    });

    // fix the broken rounded bottom look
    $('.centerwide_content img[src$="gt6ReviewMain_04.gif"]').remove();
    $('.um_top').append($('<div class="um_top_bottom" />'));

    // fix the nesting issues ...
    $('.reviewlist_columns > .um_column').each(function(i,e) {
      var col = $(this);
      // ... for the top items ...
      $('.reviewlist_column_topitem', col).children(':gt(3)').each(function() {
        $(this).closest('.um_column').append($(this));
      });
      // ... and the normal items
      $('.um_column_item', col).each(function() {
        var me = $(this);
        if (me.children().length > 3) {
          me.closest('.um_column').append(me.children(':gt(2)'));
        }
      });
    });

    // let's take care of the misformed A-tags
    $('.um_column .um_column_info > a[div]').replaceWith('Uploaded by: ');
    $('.um_column a[div]').remove();
  }

  /**
   * Compacts the achievements page, removes ads and applies some styles.
   */
  function compactAchievements() {
    addNewStyle('.right_column .alertbox {background-size:100% 90px; margin:0 0 5px 0; width:100%;} ' +
                '.right_column .alertbox .text { width:180px;} ' +
                '.right_column .alertbox .copy {padding-top:7px;}');
    $('.alertbox').prependTo('.right_column');
    $('#TOP_ADROW, .right_column > .ad_box_div').remove();
    $('.left_column', '#Container').before('<div class="topSpacer" />');
  }

  /**
   * Compacts elements on the game page, applies some styles.
   */
  function compactGameSite() {
    addNewStyle('.alertbox {background-size:100% 89px; margin:0 0 10px 0; width:100%;} ' +
                '.alertbox .text {width:180px;} ' +
                '.alertbox .copy {padding-top:7px;} ' +
                'div.SideItem {display:inline-block;} ' +
                '.gametop_container {margin-bottom:0;} ' +
                'div.SideItemFooter {background-repeat:no-repeat; height:5px;} ' +
                'div.SideItemInnerTop {height:12px; padding-top:8px;} ' +
                'div.SideItemRow {margin:2px 16px 8px;} ' +
                '.GamePageContent .GameInfo {height:248px; margin-bottom:5px;} ' +
                'div.UserReviewButtons {width:267px;} ' +
                'div.ContentWrapper {margin-bottom:5px;}');
    $('.alertbox','#TOP_ADROW').prependTo('.gamepage_right_content');
    $('#TOP_ADROW, .ad_box_div.SideItemSpacing, #ERA_RC, .gamepage_right_content > script, .gamepage_right_content > link, .gamepage_right_content > style').remove();
    $('.gamepage_right_content').find('img[src$="GTIndexForSlices_32.gif"]').parent().remove();
    $('.GamePageContent').before('<div class="topSpacer" />');
  }

  /**
   * Compatcs elements on the game reviews page and applies some styles.
   */
  function compactGameReviews() {
    addNewStyle('.alertbox {background-size:100% 89px; margin:0 0 10px 0; width:100%;} ' +
                '.alertbox .text {width:180px;} ' +
                '.alertbox .copy {padding-top:7px;} ' +
                '.left_col h1.title {height:55px !important; margin-bottom:5px;}');
    $('.alertbox','#TOP_ADROW').prependTo('.right_col');
    $('#TOP_ADROW, .ad_box_div, #ERA_RC, .right_col > script, .right_col > link').remove();
    $('.left_col').before($('<div class="topSpacer" />'));
  }

  /**
   * Compacts the search page, fixes some issues and applies some styles.
   */
  function fixSearch() {
    var pic = $('.centerwide_content > div:last-of-type > img').attr('src') || 'images/gt6ReviewMain_04.gif';
    addNewStyle('.leftnav_container {padding-left:1px; width:185px;} ' +
                '.page_content {width:812px;} ' +
                '.centerwide_content, .reviewlist_topshort, .reviewlist_barshort_topmedia, .reviewlist_containershort, .reviewlist_barshort2 {width:580px;} ' +
                '.reviewlist_topshort, reviewlist_containershort, .search_contentshort {background-size:580px 100%;} ' +
                '.reviewlist_toptitle {padding-top:8px; width:160px;} ' +
                '.reviewlist_browsetitle {margin-left:0;} ' +
                '.search_browsebox {margin-right:0 !important;} ' +
                '.search_top_drop_container {margin-top:6px; width:210px;} ' +
                '.reviewlist_barshort_topmedia, .reviewlist_barshort2 {background-size:570px auto;} ' +
                '.search_contentshort {width:575px;} ' +
                '.rightthin_content {margin-left:5px; width:222px;} ' +
                'table.search_advance_text tr:nth-child(3) .search_advance_padding, table.search_advance_text tr:nth-child(6) .search_advance_padding {padding-left:4px;} ' +
                '.centerwide_bottom {background:url("' + pic + '") no-repeat scroll 0 0 transparent; background-size:100% auto; height:12px; margin-bottom:5px;} ' +
                '#advsearchdiv > table.search_advance_text > tbody > tr:last-of-type img, #advsearchdiv > .search_advance_text {width:570px;} ' +
                '#advsearchdiv > table.search_advance_text input[type="checkbox"] {margin:1px 1px 1px 2px;} ' +
                '.search_drop_down[name="orderby"], .search_drop_down[name="s_order"] {width:100px;} ' +
                '.alertbox .text {padding:0 5px 0 8px; width:111px;} ' +
                '.alertbox .copy {padding-top:4px;} ' +
                '.alertbox .title {margin-top:-3px;} ' +
                '#tgtRightContainer {float:left; width:222px;} ' +
                '#tgtRightContainer .leftnav_shows_bg, #tgtRightContainer .leftnav_shows, #tgtRightContainer .leftnav_shows_bg { background-size: 100% auto; width: 222px;} ' +
                '#tgtRightContainer .leftnav_shows + div {margin-bottom:5px;} ' +
                '#tgtRightContainer .leftnav_show_textbox {width:212px !important;} ' +
                '#tgtRightContainer .leftnav_release_texttitle_left, #tgtRightContainer A.leftnav_release_texttitle_left {width:160px;} ' +
                '#tgtRightContainer .leftnav_release_texttitle_right, #tgtRightContainer A.leftnav_release_texttitle_right {width:40px;} ' +
                '.content_row_super {margin:0 10px 0 20px; width:540px;} ' +
                '.search_contentshort .content_row_super:first-of-type {margin-top:5px;} ' +
                '.search_content_row {margin-top:0;} ' +
                '.search_content_row {width:530px;} ' +
                '.search_content_row_info {width:445px;} ' +
                '.search_content_row_info_left {width:360px;}');
    $('.alertbox').appendTo($('.rightthin_content').empty());
    $('.page_middle').before($('<div class="topSpacer" />'));
    $('.centerwide_content > div:last-of-type').addClass('centerwide_bottom').empty();
    $('#TOP_ADROW').remove();
    $('.leftnav > div').slice(-14,-3).appendTo('.rightthin_content').wrapAll('<div id="tgtRightContainer" />').end().slice(-3).remove();
    adjustIMG();
    $('.leftnav_shows > .leftnav_shows_bg', '#tgtRightContainer').removeAttr('style');
  }

  /**
   * Adjusts images on the right bar on the search and usermovies pages.
   */
  function adjustIMG() {
    $('img', '#tgtRightContainer').not('.leftnav_promo_img').each(function() {
      $t = $(this);
      if ($t.attr('src').search(/\/sideblue_/i) !== -1) {
        $t.parent().css({'clear':'both',
                         'background':'url("' + $t.attr('src') + '") no-repeat scroll 0 0 transparent',
                         'background-size':'100% 100%',
                         'height': $t.height() + "px"});
      }
      $t.remove()
    });
  }

  /**
   * Adds general CSS rules to the site.
   */
  function addStyle() {
    addNewStyle('.sharingInfo input {width:290px; font-size:0.7em;} ' +
                '.alignBottom .sharingInfo {border:1px solid rgba(70, 70, 70, 0.55); border-radius:9px; float:right; position:relative;} ' +
                '.sharingInfo {padding:8px 8px 0; width:370px;} ' +
                '.sharingInfo label {font-size:12px; line-height:16px;} ' +
                '.sharingInfo > div:not(:last-of-type) {margin-bottom:11px;} ' +
                '.sharingInfo > div:last-of-type {margin-bottom:12px;} ' +
                '.alignBottom .Rate {float:left; margin-left:0; margin-right:0; padding-top:0;} ' +
                'div.MovieInfo div.Body {padding:0 10px;} ' +
                '.alignBottom {border-top:1px dotted #000000; padding:10px 0 5px;} ' +
                'div.SearchAjax div.Head span {display:block;} ' +
                'div.SearchAjax div.contentWrapper .content {padding-top:5px;} ' +
                'div.SearchAjax div.contentWrapper div.content {background-repeat:no-repeat;} ' +
                '.SearchAjaxFooter {margin-bottom:0;} ' +
                '.usermenu {padding:1px 0; right:0 !important; width:212px !important;} ' +
                '.alertbox {background-size:100% 100%; margin:0 0 5px 0;} ' +
                '.searchbar .bigSearchButton {margin-top: -1px;} ' +
                '#userNotLoggedIn .usermenu_item:not(:first-child) {display:inline-block; margin-top:13px;} ' +
                '.topSpacer {clear:both; height:5px;}');
  }

  /**
   * Adds a new CSS ruleset to the page. Uses GM_addStyle API; fallback in place.
   * @param {String} style Contains the CSS rules to add to the page
   */
  function addNewStyle(style) {
     if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(style);
    } else {
      var heads = document.getElementsByTagName('head');
      if (heads.length > 0)
      {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.appendChild(document.createTextNode(style));
        heads[0].appendChild(node);
      }
    }
  }

  // Helper functions -----------------------------------------------
  /**
   * Allows to change/add single key/value pairs in a string.
   * @param {String} attr The key part of the key=value pair
   * @param {String} val  The value part of the key=value pair
   */
  String.prototype.setAttr = function(attr, val) {
    var regex = new RegExp('([\?&])?' + attr + '=[^&]*', 'g');
    return regex.test(this) ? this.replace(regex, '$1' + attr + '=' + val) : this + '&' + attr + '=' + val;
  }

  // This is where we really begin ----------------------------------
  Main();
})();