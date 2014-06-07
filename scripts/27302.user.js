// ==UserScript==
// @name           Addons.Mozilla.org Useless Extensions Remover (AMOUSER)
// @namespace      https://addons.mozilla.org/AMOUSER
// @description    Allows one click removal of useless addons at addons.mozilla.org
// @include        https://addons.mozilla.org/*/browse/*?sort=*
// @include        https://addons.mozilla.org/*/search?*
// @exclude        https://addons.mozilla.org/*/browse/type:2*
// ==/UserScript==
/*
******************
**  Contact Me  **
******************
This is the first script that I've ever written that I've made freely distributed online. I'd love some feedback! Feel free to comment on AMOUSER's userscript page or email me at mathemajor+AMOUSER@gmail.com.
*/
/*
*****************
** Updates Log **
*****************
05/03/08: * Primary functionality is now active again.
05/08/08: * Created image files to potentially replace current "Red X" and added them in base 64 to the code
05/11/08: * Replaced the span containing the removed extensions at the top of the page (which really didn't
          go well with the remainder of the page) with a div.
          * Styled said div to blend with the remainder of the page
          * Working on added functionality for this container
05/12/08 - 05/20/08: TONS of changes
          * Converted some variable arrays into XPath results to help speed up script
          * Created "Remove Addon" buttons out of span elements mimicking the install buttons on AMO
          * Styled new buttons by imitating AMO .css links
          * Replaced the "insertStyle" function (that inserted style rules on an element by element basis) with an "addGlobalStyle" made with some assistance from "Dive into Greasemonkey"
          * Changed wording of the span at the top of each page
          * Fixed a bug where clicking to minimize this span and subsequently expanding the container appended a new "Remove Addon" button to each addon listing
          * Fixed a bug where removing an experimental addon from a listing did not remove its parent li element from the page until reload
          * Minor edits to most primary functions
          * Reordered the code (variables --> function declarations --> statements) for readability
          * Continued working on some new features to come
05/22/08: * Split the "Remove Addon" button background variable into two base64 images - one for when the buttons is being hovered over, selected, etc and one for when it is not
          * Worked on two "addEventListener" function calls in deCrapify to changed the background of the "Remove Addon" button on mouseover, difficultly swapping one image for another with css without bothering the elements within the first span
          * Realized the two variable approach resulted in a larger file and more memory allocation when active to operate and remembered that the style change could easily be done with css on its own
          * Added this css accordingly
05/23/08: * Added more suggested filters in comments within the BAD_* arrays
          * Added support for regular expressions in title, author, and description searching
          * Rewrote the hasBadTitle function
          * Created hasBadAuthor and hasBadDescription functions
          * Changed the isCrap function to be a simple validation calling the hasBad* functions
          * Added some examples of regular expressions to the BAD_*_REGEX arrays
05/26/08: * Fixed a bug where clicking any part of the "Remove Addon" button outside the <strong> element contained within it led to the entire page being cleared until refresh.
          * Changed the border image of the new addons button.
*/
//173 vs 168
/*
************
*IMPORTANT:* If you have added your own information into any of the following arrays, please be sure to
************ copy it to another file before installing future updates to this script.
*/
var BAD_TITLES=new Array("Reel New Media Toolbar","CallingID Link Advisor");
/* Add "has:Toolbar" if you want to hide all extensions with "Toolbar" in the title
This will hide some non-spam extensions, thats why its not in by default */
var BAD_TITLES_REGEX=new Array(
    /*Reject Cyrillic Titles
    /&#X[\da-fA-f]{3,4}/,*/
    //Reject Any Script with Characters in its Title Outside of Extended Latin (a,...,z,A,...,Z,@,#,$,etc)
    /&#X[1-9\w]{3,4}/
    );
var BAD_AUTHORS=new Array("Guy Levy", "Arvi","Playful","Terry Ballantini", "Hadakadenkyu");
var BAD_AUTHORS_REGEX=new Array(
    //Reject Any Script with Characters in its Title Outside of Extended Latin (a,...,z,A,...,Z,@,#,$,etc)
    /&#X[1-9\w]{3,4}/
    );
var BAD_PHRASES=new Array(
  "collects anonymous usage data", 
  "radio-toolbar.com",
  "conduit",
  "communitytoolbars.com",
  "ourtoolbar.com",
  "DOES NOT spy on your browsing habits",
  //^Ironic how that seems to be a sign its a bad extension :\
  "toolbar.com/privacy",
  //The following two entries can be enabled to remove dictionary and spellchecker scripts.
  //"dictionary",
  //"spellchecker",
  "radio",
  "shiitake"
  /*
  My Personal Recommendations for Additional Filters:
  'NBA',
  'NFL',
  'NHL',
  'MLB',
  'university sports',
  //^I'm not a big enough sports fan to justify the use of sports extensions
  'university themed',
  'facebook',
  //^This last one will block a lot of extensions, many of some use, but since you're clearly
  //using Greasemonkey, the mass majority of these extensions' functionalities can be readily
  //replaced by GM scripts. This leads to less overhead for Firefox and allows for more
  //freedom to turn the scripts on as needed.
  //Some other recommendations along the same lines...
  'gaia',
  'washington post',
  'cnn',
  'livejournal',
  'myspace',
  'mercado libre'
  */
);
var BAD_PHRASES_REGEX = new Array(
  /[a-zA-Z\d]{1,256}\.tv/, //A regular expression for those of you who have no need for scripts covering .tv sites
  /[A-Z]{1,2}U(?=[uU]niversity)/,
  /[A-Z][a-z]+ [A-Z][a-z]+ University/
);
/*
************
*IMPORTANT:* Unless you have hacked the remainder of the script, no data will be lost by allowing
************ updates to save over the rest of the file.
*/

var removeAddonB="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAIAAAAxBA%2BLAAAABGdBTUEAALGPC%2FxhBQAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFCgUOFWBxUHgAAB10SURBVHja7d1viGVnfQfw350Mk4ndpDEJywY1mFDjNmt1u2D1RRMU6xZq6ZtWsFJLKSKoRX2jFUulUCn4RmvRYqVoFFulKJa2vllMkY2KUFgW28giZU1DaSRNY7K52Z0Mm719cce7d86f5zzPOffO3N35fFgud8495znP83uec75zJ5m5o8k3vhAAcFCtKQEABzsIL25HxNXHypezjW3bE0elH0vPW3R45igyj%2Bp8khhjegidxxbVMPMsOQ2WLoCigiTqmd6Y6Ftit6Kelx6YmO7S0mVOTeYFkr%2BKOmd84CrNuZZ7nyL%2F4l1Is%2FllWdSFULSPCyGzVrXH0eSLn4mIWF%2BPy5d3wnH6fLal%2FlLleeVJ%2FTGx87zES%2FXdMndODK3xwLbBlnayvkPOwDtPlFnPnE5m7p8zm21fNm5JDDBR%2FM71UzRZmWs7f6UVdS9xmeSs86I%2BN3avbc%2F0tGZKNJtzoWWeOv%2Fu1Hmh5dwZcuYiUcCcoXWetN8q7XFNld7Z0i2k7wb5d5LMm3DmgbUtPwvCiue348aNoe82ezQyf8js%2BZDOLGQg%2BV1ddq%2BWN5zrRmaJ2nYr3b6k9jtPtzcrYXn3gX1cyfVTL%2FUOk9hhSUXo1%2Bx%2B3fMX3kiv4BhNPvfJhs2XtuMmN9wVUzopi5rEzHasmb2fYlakgDnnXVLfljrkBTZe1FS%2F83Ye1b7DaPKpj7t8uGa8cDluWFcGc4HZWaD1eOGyKnCNXeGYC0zQ4qzFpe1d%2F57b2nkLOf03Nb9x%2BmS2ZfZY3zJ7rH9ZeT7%2Fb9pUZZ%2FGk9Zbnn%2BsN1IZYL2ptn7ODpk%2BmfWwPurGsVRKNDu2sRSVas93ab4y6ZqkSzTfk%2FkKN85p2zKonKXxpcaBzKamsXqNFWsrV6WkjYunrQ71ChQts8okVlqr9L%2B%2BhNomfb7ZxktvfodKU%2Bm6tV2hbRdsW1fb1sB8n%2BevvraB1K%2BXxHAaz1s5XfrKbdvYeD1WGqzPS33Vpa%2B7%2BjJobCd9Q0vMVNu%2F8cXmtdd4W2scYP0Cb7uZNGZBYjU2Vqbt8q%2FPe%2F3w%2BmxWTtd47M82jiZ%2F%2Fqe%2BHQDgWnjvthZHj8bJk7s2njoVP%2FzhkFZHkw9%2FMNbW4sqV5lNOt7ftUNmzvtv89rbHxsMbd8g8UaXDlZ0TY2l8Kd3VdOOd40rXqvN0icokOlY0hPSxRa%2Bm9y9tM70mE20WvZSoT7pjndvzF1t63WZeCznjTTzJLHtnuYbcGRIV67xrFd0xOu%2BERUd1Vj6xQ%2BYdJuek6QWZeV%2Fq3J4uVOcS6lw8r70vTv5Wa8H%2F6Wvx7%2F%2BZOmn7ahlNPvxB32QAsLqeGcevPVB9I1h36lT825keza%2FHM%2BOdpz9%2F6OrzisRLmSotZDbYe7f0gW2vlg5ztn%2FngYnhlx677HINmZr8jf1mcMgSne4wvJhFiyRz2Q%2B%2FvnqXKGfqe18Xi%2Bpkvx2KhlN6x%2Bi3qhdywS7kKltUm0W3wX77T91zT3cKRsTJk3H%2Bv%2BP8%2BdKxjCbvfrfvNgBYUeNx%2FPVfFuz%2Fng%2FEoUOF7wjHY3XuduiQQnENrJMVXKjX07Wz1LEsr%2FGFtLyP8%2FjqVxfv%2F4MfFAZhka2t2Nw8iDe4J588oANnH9dJj8ttBSPnerp2xuMl3gMXWKhKJxfS8n7N43gc97x05%2FnZs%2FGDcy3hdzSOH995fs9L43vfK3pTuB5bW1k7Tv%2BS6bTEB9OBHXhvszVjnQxs7Vqv5HV27SxvOAtsudLUQlrel3m8cCEOH5599eP3vrdxr7sffigi4tyZOHoiDh%2BOCxeKLpmSvyt%2F2R8poDwLUUno7emn4%2FjxOHcmIuL4ibsffujH97%2BpIQWn%2Bxw9ERGxeaX0krnhz172soiIS5euPr7wwtV%2F89srr86%2BrO%2BTfqwcktNgemPi8Pr2xp07288ZRXp7TptFJW2boMziJ6a492BLJ67f0DKnr6gmRVPcexQ5xU%2Bv2KKLoqifnQf2nvT8pV466T0maHjfcuqTuHOWLqEFjqhHqXvcGIcXtvJ46VIc%2F6VYn8TRE3HuTLzql1%2F8G7%2F%2B9Be%2B1JyC587Ek4%2FH1lr84z%2FHTTfl3xlGkze%2FufqzrPnH9EuJ%2FYt%2BOFZpcP5b4Mr2ymdWNZ6osXs5%2B9R3aNuSaLnSeERrcdoKVW820dvENLXNQs4kpmc2UdK2mrQNZ34e20aXfmyrXrp7nau9ssDSY2yb3%2FyLqL62M3fOWb3pOmSOLqd7mSuwrWKd9ax3tb5%2B0sXvHGznCk90ptKl0rLk3EhzVlTjzTN%2FRtpeypzrzDt82126ftRTT8Xb3hZvOL77h7Rr0%2FeFdz%2F80M77v5mjJ%2BKzn4%2BvfjVuuSXrqoyIiNHk%2Fvu9%2BQZgFV28GIcPxz98eeeno9O3fRGxtXb1p6Dz2yPio5%2BIJ56IF70o%2FySjyetep9QArKLxOM6fj699Pg7fkbX%2Fs%2BN4y9vj3nuL%2Fh%2FX0eQ1r1FqAFbR5mY89ljcdls8mPc79X%2FwgXjqqfn%2F0TRHyf81ur6%2BgP91bSGNLMkq9%2B367vw1NMBrpc7X%2FXrgul9d07NMfzX2%2FPn46Cfig%2B%2BKiLhxI57fvvrkxo2I2HnysU%2FH%2BfNx112l3RtNXvlK0wrA6rpw4dnHH7%2F52LH4yPvizqZ3e48%2FEX%2FxV88%2B8sjNd94Zt9xS2vxocvfdigzA6trejitXnn388Yi4%2BdixeOCB%2BNXjcest8fSF%2BM7ZOH362UceiYib77wz1tZiY6M8CF%2FyEkUGYKVtbcXGRjzxxLMvvPDk7lfuiLj5hhvi1lt7%2FxG40eT222Nzc%2Bdv59SfTKW%2FTGysbG9sv35goj%2Fprib6WTTGRJcSI033oa2FnOc5Ze8cYGaz%2BfPVu9o5reVXpseizVlypUs6vRhymiqapoE1GXJV5i%2FF%2FH4W1arfSht4H%2BhxNZUOPPNm23v%2F0ntm0fXVe1n2CJfxuPqfAG%2B9tc8tcW77aHL77b7VAODAGk1uvFEVADiw1pQAgANt%2B2f%2FJjfeOP%2Bk8mX%2B8%2Fq%2FelNFT9o2ZvYkv8Hever8sq2kPUadeWzODkXH5r%2FUbyqLSp1T9sbO5AyztP%2BZ10v%2BeYsKlb8Mii7qzieli7lfzfMH1WMBl15TvQc%2B%2FL435CbZ48rqV4eiznfOeHrKiq7lnHKNtn0vAIAfjdY%2F1nrc9HxcuE%2Fv5%2BOSU2c2ntPJRfW293DG5fXM79K4sBSd3R5e7dLZ71G38XL2H7L%2Bl7R4Fj6u8eLqtpCl3uN5j5U8sGPjZV7Xi6rYYu9vRctg4A75QZA5y9Pno6ciIuJQSx6k9TtqeCMLOe%2FwU3Tuk9ih8lLmiNK7LXwSczqZf%2FiQgfcYQmnLy6htfmtt7S9kHe79pbS8%2B8myL8w9G3LR%2FqUj6j3A3lfB7KV%2BxV%2FUjPRuZycIAeBgWpv%2BeqFHjx4X9XhtNevRo8fR%2F%2FhmAIADbD39YRXrEfv1US77eGpD4zpebHuw%2FKzw66ZKq9PJ9YhYWmdGj1qPABzkb0quqAEAB5g%2FsQaAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQACEIlAEAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCIAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAH2mjy3W%2FGxkZsb3v06NGjR48H8HE0%2Be43fTsAgB%2BNAhwMz2%2BrAfPWr66JGzd2rY%2FKlxX1VxP7p5vqt0%2Fj%2Fo071J%2BkT9pjIDmdH160xJZ%2BlcnfIVHDIWVpO%2BkCz1K0qnuvzNJql%2B5c1IfM6vVbJ6Uzkl45PWat7aXSUees9oF1KF3M%2BaNuO7DHbpkXftGs5R81sLaL2200%2Bddv%2BHYAgANrLSLi0tbVx6nKlvkvKxvbduhsM6eRRGd6dK%2BohzlnyexYWzd6Vy%2B%2FOIl%2B5ne%2B8%2FCiqcnvTNFRncsys1a9i7Co6uVMff4%2BRV3d42XT45rq97jAZnsv6czbXb9q97snly7RIddyjxP1Xjw9bv6XtkaTb37FtwMAHOx3hABwUK3H1pYqAHCAgzDf1nZsbmRtrL%2FtvNL%2B5Uq9Pb6ywp0Z0r2Vrfn%2BFnYhZenXyEJOnXP1rc6CmbU5pNvLXsnLK%2BmKr6VryOG74vjxXVvOno0nHhuyxkaTv%2Fubvej65kZs7ffv7jT2YQ86Vj9F0UlXoXTXwezv5QA7x3utF2TvF%2FBSK7Zq07HH%2FSldvfvV4ecuxi%2B%2BuhqB806diq0Lvb8D2e3y5V1P0o%2Fpl%2Ba3bG3v2l4%2FNvGk8cvnLra209axxj5UNibOmK5AohrTJTK%2Ff%2BKkldHNDq8Pbb4Cw%2BersXo5Q070vHEI6UZKO19fBm1LonO%2B0uNq%2B3LagdkA6ystc0nUz16pZHpGikadObTGFmbjTV%2FylWp0LqT0IoyI8cXcyy3nZlI5UX2%2Bim4C6S5l9mF%2Bh%2BlgZzu0rYQeHWi8QudPl3N3qm%2BvtJBzSeYstkoR0ikYESdPxl2%2F0HHhtDwfTb74mXh%2Be%2Bc3Decf51V%2BU7KyW%2BOraW2nq29va7zxl08T%2FUyfMTGK9JfpEvWuXlFlck6auVuPnYsmKLp%2BmbdomKVnTPe%2Fx2LIOSp%2FotNLOtHt6PrzEYmRDpmRzPHmX4%2BdNelch5lFy5nQ%2FGtwyG1nIfe9nMszc0UVXb%2FpbjS%2Bmlje6WV8%2B5E4eTLrzd2pU%2FF%2FPykd8mjyuU%2FGpe24qfbj1PrG2ZbG%2FetHte2feXj%2BDomu5nxZpO3YdMcay5K5T%2BLYzleH9DmnVp2Vz%2Bxk0WIrmr6c%2BgwpSE65cjo8vAIDr8rei7%2B0ApkLLHPh7fFyyhzCAuei6AIsWu1D1nnRHS%2F%2F1G1H%2Fe%2FT8b73FYzls5%2BPjSu5t9CIuLQ9mnzq4wEAK2h8MY4ezX07OHtT%2BF%2Fn44aC%2FxV0PV643PM90ELeSC3JUk838FutVavVMjpwaTsOvSjGF3fauWG9%2Bfl1sBhWdo56rLr5KevRk9513q8J6vdOfXkd6D0FA0e9Z%2FWfnmh6B8gf6XNbcfjwzvOzZ%2BPMfzTvduJVu%2F4L4pMX4o5bSoLw0nbWABZShT1e5avT%2BLL3X8HqTf%2F7%2BU472y3Pr4vFsLJzVDrqXVPWqye967xfE7Rnd7%2FMxntPwcBR71n9L23v3AHyR%2FrTCxER587E0RMR8cj73%2F%2F92i6vjzj28ENXdzt8OH56IX5uM79fa%2FHc1k7qzp5cuRJXruw8mX0521jfuX5IpZ35L%2BunmG989qRyVH3niF1fVtqZHj47qtLUfK%2FmH%2BuvVvo8G3t9n8ahzbff1tV639q2V6o960xbz9tq2Fn%2FxuGkp6Mya5VeJcbVtpYqfZg9ziai3nLbepg%2FdVvPK202DrxtRJWXOue6cgUllkfjektfsPNVmt%2BzPqedl0%2FjYm7r3vyW%2BTq3reT6Km1rv%2B3ekrhCOxdt5VyJm0nRv2k7idtdYi3V%2B5merEr%2FGy%2FqRK3a7pBFd6TEPo2na7yxNw55%2FsuIOH48jp6Ic2fi%2BPFjDz%2F0%2BsYUPH58FpaxWZvT%2BsrZfYrR5CN%2F7KfQAKycmzbi29%2BLP%2FmjeO0DOzl39mxEPHL%2Fm75feS%2B4eWUnLCNiay3%2B%2Fmvx4qIfjV7xF0cAWD3PbcW998ZPt3YS7tyZ2Iw4euLY178Sv%2F27MU3BWQRO9zl6Ik6dih%2F9KF57ouRHo8%2BM45lxRHQ%2Fzj9p%2B5c4Nr%2F9xi8zX6p3tbHz%2FU6Rbi1nREMG1daH9BwNP1GPY9vGmzl3Cy9FeoH16MbwMmYu%2BB4TUTTMxOJZSGd6lKj3auy9Skvr0%2BNWM2QUmW0OXyfLqFLv%2FWfPf%2FSj%2BNbpXal17kzcdcexr39lJwWnW%2BZf%2FdbpuPfe3JtkRDwzHk3e%2FW7fdgCwoh59NN75%2B3HXHVk7b2%2FHuz4UJ07EoUMl7wgjYjxufky%2FNL9DYs%2F9elzGgYvtUuf2om40TtC%2BFHDZw19ef%2FIPWdSplzFHy7t8ljc7q39bWMb09TvjCt54h48osfN4HNvb8bdfys20j3067rqrtBujyTve4RsOAFbU1lb88IfxwAPxe795dWPl78lNfflf4vTpuO%2B%2B2NwsOsPaoM7tY132vnsrPt5rtz%2FX8Sdi%2BrDP67J6y%2B7Y9XTvWojNzThyJE6fjnd9KJ54Ip7fvvq3Q6dPnt%2BOn1yId30oTp%2BOI0d6nGE0eetbXXEArLSnnoqf%2FCTOn483vCFe%2FvI4%2BSuxsRlPX4jvnI1HH41vfzvuuSeOHInbbuvR9lpE3geORN4HZyQ%2BYSRn%2F8zPOom8T5zJ%2FEyiSH7%2BS84H2eR%2FuEzmRzh1Vqyz1KUfpxXJz4VJb8%2F7oJPuguR%2FHlaP8nYOMP%2BDdYqajcIPluocfo%2BPB0r0MP3haAOv7n5Tn1%2FA%2FI%2Bmyq95DP7EqMzPFepxm8q%2FonvcNIo%2ByylKPr6t9FbWVsDbbosjR%2BK%2B%2B%2BKxx%2BLBB%2BPt74nf%2BcN45wfiwQfjscfivvviyJFdPxEtmdDR5C1viY2N2J77UzeVL5dnD040O8WSztWj2SE9GTiK%2BcP3bJYXWNu96XP6vL37kDhwsUtiIVXay%2Bul9FzpRvJby9lzIR3e4%2FvnohZw7%2FrkHD6khtOf9D79dGxtxeZm3HprROxEYN%2F%2BrEVE9eXt7atb6kfOb6nslvlluqn0gennbVtmI2o7vC6xZ6XlzpcS5e0cb1uvEo0ndsgsck49i3qbWBWd7eeMpXPtJZ7UR1H53%2FMq8zX%2FanpEjY0kqt25pNtGkdONtr61lSUxzPQp0t2YNVvvf%2BcpZlumjbRdVvWet7Vcmei2k6ZXTtGdqnOppOeuc%2Bm23Xgbq515gae%2FrN%2FNcm50iZ7kXBpra7G2FkeOxMtfHkeOxNra1TeCmQOsnWg0efOb4%2FLlWF9vfZy9f1xf3%2FWus3GHzqYav8xvodKNxr61NRXRcNLG4TR2L3%2BMjXvOvx%2Bvt9mjhm29mrY%2Fv%2FNUY%2FU6K9x2SGfP20aXc9LEpJROTeOPgBIrOf1l5kpoO2NOBXJ6Ul%2FM9e2lU9zvsd8Czq9k7%2F4kluJiz5hebOl7Uf4dMqfIiTNm9ip9oRX1c7ElzVxyiYu96xIeTd74xv7vzTunfw%2FknGjPOrOMQe1j55d96mW0v5A2V23BXHML%2BNpdEgvsQGdGsjKrfTS5%2F%2F7qW9GNjYY3uRsZHxw1v9vsedux0%2B2NhyROnW6286Sd3U7v0NaZ4dJVWkiD%2BU3lD7OzMv3G1W8e80%2BRXnWda7LHVTCkh0taOUOu9MUu%2FuF3m4HdG7JcF1v%2FomuwcgutL7z19bh4sfjiXewdpnSaMm8%2BPS7b5CGjyete51sQAA6stcU36ZeIsUiwql0m185IR5PXvMYCBuDAvyPM%2Be3a%2BS2Nhvzea2T%2Fmmf67JXnw38ztLOdnN%2B%2BLypd0RTknCjzV%2B8TL6V%2F8T9%2F1KW%2FlVy02IoWRk7Pc%2FqcP9cD%2F4JBzsJe7AVVVOT8C6fzzy%2BUTlbOKs35Gwila69fSYsM%2F938Hmsvfwbzb5U5O3T%2BLZHMFZV%2FN9j1jvDYsYbNy%2Fsv4VOz%2F4eY1dd7stpWUU6Di1oh18RKq%2Fwv9Ssyrr0pXedZFt6N5RV5BRdb5Xc2aH1HWP%2BV89n%2FjBQtv5IZLb%2Bo3vhbw437XLzY2mzblkR%2F0hsb9yl6zPl90rZfRO1sNr%2FB9EiHdDVdrosXsyoc7X%2B4oLJPvcF6hysrJGcZND5Oz5U5I%2Bkz9pjinHbmCzJfmfQwK3vmX335XU13JvP3rzuH37gY5puan8Gi%2B0zb4%2BXLubPcVoG2gVe6mnNxJVZvv4lrLG%2FjQErvCUX31aIb78BbaOkF3vQ4mrziFb4dAODg%2Ftir%2BSen82%2Bl6887%2F45J4x9Sqf91gFmblQ4U%2Fc2Iys%2BUOv8MR33n%2Bf3rP0zobKdSn3mNP45o%2FDFFYkQ509FYwLYDOweYGHjbnLYNJNGBtt42VrXxL%2FIk1mR6LSWWYlsRGk%2FaOJbE8mhcAIkfW2Wuurafg3VWpnFEbQs75ybQ1r3EX1lKrPDOpnJ%2BElj0p1sS10XbnSry%2FmZNzmpPrKW2O1tiMadvNUULpm2uG0%2BRbq3z3pu4ytrWcP2mlFgVLecaTe6%2B27cDABxYa0oAgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAiAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBABBCACCEAAEIQAIQgAQhAAgCAFAEAKAIAQAQQgAghAABCEACEIAEIQAIAgBQBACgCAEAEEIAIIQAAQhAAhCABCEACAIAUAQAoAgBEAQKgEAB9n%2FAzf4%2B71jdfMOAAAAAElFTkSuQmCC"
var removeAddonBBorder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAEsCAYAAAAfPc2WAAAABGdBTUEAALGPC%2FxhBQAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFGhEQAnzVtlMAAAbnSURBVHja7dzPalxlHMfh7%2FvmnJCGMLZYCrbZNYuGrEqx2rX1OgpFvI6uewniLbhxK7go4h1EuxIXoWBoGWyjtDOTc1xMxo5TkTqZYIPPA8P8O6vfGWY%2BvPNyytOXXf9y8iLX7t1PDg6SrkuOjgIAwIKtraTWZHs7z778Iv3GxZRS3jisHBz92l%2F78OOk1pT9%2FWJyAAD%2FrN%2Fb69N1efb9d%2Bk3Lk6jai606rV798UVAMC%2FUPb3S2rN%2B599nvHo1Rvv1xwciCsAgGUi6%2BAgH3z9VcajV%2Bn7fi6wus6EAACWcXSUPH6czZdHKf3xXGDZ0A4AsJyuSw4P895PP2d8PL%2BCBQDA8kaj5PcX6btjgQUAsBKTSRa3XAksAIAVa4wAAGA1ZpfCsoIFALBiAgsAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAgsAAABBYAAAILAEBgAQCcL40RAACcUp2uWc1WrqxgAQCsureMAABAYAEACCwAAIEFAIDAAgAQWAAAAgsAAIEFACCwAAAEFgAAAgsAQGABAJyrqBJYAABnGFsAAAgsAACBBQAgsAAAEFgAAAILAEBgAQAgsAAABBYAgMACAEBgAQCcgcYIAABOoZ6sV5WklpOXTAUAYMXNZQQAAAILAEBgAQAILAAABBYAgMACABBYAAAILAAAgQUAILAAABBYAABnG1UCCwDgDGMLAACBBQAgsAAABBYAAAILAEBgAQAILAAABBYAgMACABBYAAAILACAM9AYAQDAapSTeytYAAArJrAAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAQWAAAAgsAQGABACCwAAAEFgDA%2BdIYAQDAKdWaWpJa%2BulTEwEAWHFvGQEAgMACABBYAAACCwAAgQUAILAAAAQWAAACCwBAYAEACCwAAAQWAIDAAgAQWAAAAgsAAIEFAPCuaowAAOCU6nTNqsyemggAwIp7ywgAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAQWAAAAgsAQGABACCwAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAAEFgAAAILAEBgAQAgsAAABBYAgMACAEBgAQAILAAAgQUAILAAABBYAAACCwBAYAEAILAAAAQWAIDAAgBAYAEACCwAAIEFAIDAAgAQWAAAAgsAQGABACCwAAAEFgCAwAIAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAgsAAABBYAgMACAEBgAQAILAAAgQUAgMACABBYAAACCwAAgQUAILAAAAQWAIDAAgBAYAEACCwAAIEFAIDAAgAQWAAAAgsAAIEFACCwAAAEFgAAAgsAQGABAAgsAACBBQCAwAIAEFgAAAILAACBBQAgsAAABBYAAAILAEBgAQAILAAABBYAgMACABBYAAACCwAAgQUAILAAAAQWAAACCwBAYAEACCwAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAEFgAAAgsAQGABAAgsAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAABBYAAAILAEBgAQAILAAABBYAgMACABBYAAAILAAAgQUAILAAABBYAAACCwBAYAEACCwAAAQWAIDAAgAQWAAACCwAAIEFACCwAAAQWAAAAgsAQGABACCwAAAEFgCAwAIAEFgAAAgsAACBBQAgsAAAEFgAAAILAEBgAQAgsAAABBYAgMACAEBgAQAILAAAgQUAILAAABBYAAACCwBAYAEAILAAAAQWAIDAAgBAYAEACCwAAIEFACCwAABYlSKwAAAEFgDAO09gAQAILACAd1cnsAAAVk9gAQAILAAAgQUAILAAABBYAAACCwBAYAEAILAAAAQWAIDAAgBAYAEACCwAAIEFACCwAAAQWAAAAgsA4P8TWE1jCgAAy2ia6a3WhcDa3DQcAIBlTCbJ1atvvFyzuZl%2Bd7c3IQCAt9fv7vYZDJLt7aRpU0qZC6wHD6YH7e2JLACAt4mrWTfdvZsMBhle30lf1%2F58v%2FwyfN5f%2Bfab5OHD5Pnz6f%2BIk4nJAQAsmnXSYJDcvp3s7CQ3buTw9p1sXLiQZq2eHNa2GX7yaS5tbSWPHiVPniSHhwYIALBoY2O652owSK5cSba3M7x5K03bps5tdG%2Fats2o7zP86E4uJcnTp9OVrNEo6TqDBACYqTVZX58G1uXLGd68le7CZtbbNvX1FqyU38Zdf9x1GY%2FHmYzHaUty6ccfksl4eoTIAgB4fSmGps3w%2Bk7G7Xqatk3btlmbr6tZYCVJ1%2Ffpui7jrk%2FpjtP39rwDACwqpaSva2lrSa01C23118Div%2BMELHwojQDAr8g517ztj9vs0g5l7lTOHpckfT997DQvFxTm9vdfFWILQFydR38ALAHF%2BgqY7sYAAAAASUVORK5CYII%3D";
var removed;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function loadMoreRules(){
	var saved=GM_getValue("bad_titles");
	if (saved!=null){
		saved=saved.split("\n");
		BAD_TITLES=BAD_TITLES.concat(saved);
	}
}

function deCrapify(removeListener){
	var results, entry;
	removed = new Array();
  var content=document.getElementById("content-main");
  resultsNorm = document.evaluate(
    "//li[@class='addon']",
    content,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  resultsRec = document.evaluate(
    "//li[@class='addon rec']",
    content,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  resultsExp = document.evaluate(
    "//li[@class='addon exp']",
    content,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i=0;i<resultsNorm.snapshotLength;i++){
		entry=resultsNorm.snapshotItem(i);
    var uselessAddonRB = getElementsByClassName(entry, "p", "removeAddonButton");
		if (isCrap(entry)){
			entry.childNodes[1].className+=" highlightRegion";
			entry.setAttribute("style","display: none !important;");
		}
		else if (uselessAddonRB.length==0){
      var removeAddonButtonContainer = document.createElement("p");
      removeAddonButtonContainer.innerHTML = "<span>"+
                                               "<span>"+
                                                 "<span>"+
                                                   "<span>"+
                                                     "<strong>"+
                                                       "Remove Addon"+
                                                     "</strong>"+
                                                   "</span>"+
                                                 "</span>"+
                                               "</span>"+
                                             "</span>";
      removeAddonButtonContainer.className = "removeAddonButton";
      removeAddonButtonContainer.addEventListener("click", removeExt, false);
      entry.getElementsByTagName('strong')[0].parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(removeAddonButtonContainer);
		}
	}
  if (resultsRec.snapshotLength>0){
    for (var i=0;i<resultsRec.snapshotLength;i++){
      entry=resultsRec.snapshotItem(i);
      var uselessAddonRB = getElementsByClassName(entry, "p", "removeAddonButton");
      if (isCrap(entry)){
        entry.childNodes[1].className+=" highlightRegion";
        entry.setAttribute("style","display: none !important;");
      }
      else if (uselessAddonRB.length==0){
        var removeAddonButtonContainer = document.createElement("p");
        removeAddonButtonContainer.innerHTML = "<span>"+
                                                 "<span>"+
                                                   "<span>"+
                                                     "<span>"+
                                                       "<strong>"+
                                                         "Remove Addon"+
                                                       "</strong>"+
                                                     "</span>"+
                                                   "</span>"+
                                                 "</span>"+
                                               "</span>";
        removeAddonButtonContainer.className = "removeAddonButton";
        removeAddonButtonContainer.addEventListener("click", removeExt, false);
        entry.getElementsByTagName('strong')[0].parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(removeAddonButtonContainer);
      }
    }
  }
  if (resultsExp.snapshotLength>0){
    for (var i=0;i<resultsExp.snapshotLength;i++){
      entry=resultsExp.snapshotItem(i);
      var uselessAddonRB = getElementsByClassName(entry, "p", "removeAddonButton");
      if (isCrap(entry)){
        entry.childNodes[1].className+=" highlightRegion";
        entry.setAttribute("style","display: none !important;");
      }
      else if (uselessAddonRB.length==0){
        var removeAddonButtonContainer = document.createElement("p");
        removeAddonButtonContainer.innerHTML ="<span>"+
                                                "<span>"+
                                                  "<span>"+
                                                    "<span>"+
                                                      "<strong>"+
                                                        "Remove Addon"+
                                                      "</strong>"+
                                                    "</span>"+
                                                  "</span>"+
                                                "</span>"+
                                              "</span>";
        removeAddonButtonContainer.className = "removeAddonButton";
        removeAddonButtonContainer.addEventListener("click", removeExt, false);
        entry.getElementsByTagName('strong')[0].parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(removeAddonButtonContainer);
      }
    }
  }
	adjustMessage(removeListener,content);
}

function reCrapify(){
  var content=document.getElementById("content-main");
	var results=getElementsByClassName(content,"div","addon");	
	for (var i=0;i<results.length;i++){
		entry=results[i];
		if (isCrap(entry)){
			entry.removeAttribute("style");
		}
	}
	var message=document.getElementById("removedAddons");
	message.innerHTML="Useless Addons Hidden (click here to view)";
	message.removeEventListener("click",reCrapify,false);	
	message.addEventListener("click",deCrapify,false);
}

function adjustMessage(removeListener,content){
	content=content?content:document.getElementById("content-main");
	var divRA;
	var needToInsert=false;
	divRA=document.getElementById("removedAddons");
	if (!divRA){
		divRA=document.createElement("div");
		divRA.setAttribute("id","removedAddons");
		needToInsert=true;
	}
	if (removed.length>1)
		divRA.innerHTML="<span id='removedMsg'>"+removed.length+" extensions removed"+" "+"</span><span id='removedAddonsList'>("+removed+")</span>";
	else if (removed.length==1)
		divRA.innerHTML="<span id='removedMsg'>"+removed.length+" extension removed"+" "+"</span><span id='removedAddonsList'>("+removed+" )</span>";
	else
		divRA.innerHTML="No useless extensions found";
	try{
		if (removeListener) divRA.removeEventListener("click",deCrapify,false);
	}catch(e){}
	divRA.addEventListener("click",reCrapify,false);
	if (needToInsert) 
		content.insertBefore(divRA,content.firstChild);
}

function containsTitle(title){
	for (var i=0;i<BAD_TITLES.length;i++){
		if (BAD_TITLES[i]==title)
			return true;
		else if (BAD_TITLES[i].substring(0,5)=="has:"){
			if (new RegExP(BAD_TITLES[i].substring(6),"i").exec(title))
				return true;
		}
	}
	return false;
}

function isCrap(entry){
	//GM_log("entry: "+entry);
	var title=getTitle(entry);
	var author=getAuthor(entry);
	var description=getDescription(entry);
	//GM_log("Title: "+title);
	//GM_log("Author: "+author);
	//GM_log("Description: "+description);
	if (hasBadTitle(title)){
    removed.push(title);
    return true;
	}
	if (hasBadAuthor(author)){
    removed.push(title);
    return true;
	}
	if (hasBadDescription(description)){
    removed.push(title);
    return true;
	}
	return false;
}
function hasBadTitle(title){
	for (var i=0;i<BAD_TITLES.length;i++){
		var bTitle=BAD_TITLES[i];
		if (bTitle.substring(0,4)=="has:"){
			bTitle=bTitle.substring(4);
			//GM_log(bTitle);
			if (title.match(new RegExp(bTitle)))
				return true;
		}
		else if (bTitle==title)
			return true;
	}
  if (BAD_TITLES_REGEX.length>-1) {
    for (var j=0;j<BAD_TITLES_REGEX.length;j++){
      var bRegExp=BAD_TITLES_REGEX[j];
      if (title.match(bRegExp)) {return true;}
    }
  }
}
function hasBadAuthor(author){
  for (var i=0;i<BAD_AUTHORS.length;i++){
    var bAuthor=BAD_AUTHORS[i];
    if (author.indexOf(bAuthor)>-1) {return true;}
  }
  if (BAD_AUTHORS_REGEX.length>-1){
    for (var j=0;j<BAD_AUTHORS_REGEX.length;j++){
      var bRegExp=BAD_AUTHORS_REGEX[j];
      if (author.match(bRegExp)) {return true;}
    }
  }
}
function hasBadDescription(description){
  for (var i=0;i<BAD_PHRASES.length;i++){
    var bPhrase=BAD_PHRASES[i];
    if (description.indexOf(bPhrase)>-1) {return true;}
  }
  if (BAD_PHRASES_REGEX.length>-1){
    for (var j=0;j<BAD_PHRASES_REGEX.length;j++){
      var bRegExp=BAD_PHRASES_REGEX[j]
      if (description.match(bRegExp)) {return true;}
    }
  }
}

function getTitle(entry){
  //GM_log("getTitle: " + getElementsByClassName(entry,"h3","name")[0].innerHTML.replace(/\<.*?\>/g, ""));
  return getElementsByClassName(entry,"h3","name")[0].innerHTML.replace(/\<.*?\>/g, "");
}

function getAuthor(entry){
  //GM_log("getAuthor: " + getElementsByClassName(entry,"h4","author")[0].innerHTML);
	return getElementsByClassName(entry,"h4","author")[0].innerHTML;
}

function getDescription(entry){
  //GM_log("getDescription: " + getElementsByClassName(entry,"p","desc")[0].innerHTML.replace(/<br>/g," "));
	return getElementsByClassName(entry,"p","desc")[0].innerHTML.replace(/<br>/g," ");
}

function removeExt(event){
  /*The following conditional fixes a bug involving the selection of the <li> containing
    an addon after an HTML element other than the removeAddon <p> element
    has been selected (i.e. one of its children).*/
  if (event.target.tagName!="STRONG"){
    var strongRAB=event.target.getElementsByTagName("strong")[0];
  }
  else {
    var strongRAB=event.target;
  }
	var entry=strongRAB.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  GM_log(strongRAB.tagName)
  if(entry.nodeName!="LI" && entry.nodeName!="UL"){
    entry=entry.parentNode;
  }
	var title=getTitle(entry);
	removed.push(title);
	var saved=GM_getValue("bad_titles");
	if (saved==null || saved.length==0)
    saved=title;
	else
    saved+="\n"+title;
	GM_setValue("bad_titles",saved);
	BAD_TITLES.push(title);
	var message=document.getElementById("removedAddons");
	entry.childNodes[1].className+=" highlightRegion";
	if (message.innerHTML!="Useless Addons Hidden (click here to view)"){
		entry.setAttribute("style","display: none !important;");
	}
	adjustMessage(true);
}

/*
    Written by Jonathan Snook, http://www.snook.ca/jonathan
    Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];      
    if(oRegExp.test(oElement.className)){
      arrReturnElements.push(oElement);
    }
  }
  return (arrReturnElements)
}


/*CSS for new page elements*/
//removedAddons
addGlobalStyle("#removedAddons { -moz-border-radius: 6px; background-color: #ffcccc; border: 1px solid #e9eff4; margin-bottom: 1em; padding: .5em 1em .5em 1em; }");
//"Remove Addon" buttons
addGlobalStyle(
  ".removeAddonButton span { background: url("+removeAddonB+") 100% 0 no-repeat; }"+
  ".removeAddonButton span span { background: transparent url("+removeAddonBBorder+") left bottom no-repeat !important; }"+
  ".removeAddonButton span span span { background: transparent url("+removeAddonBBorder+") right bottom no-repeat !important; }"+
  ".removeAddonButton span span span span { background: transparent url("+removeAddonBBorder+") left top no-repeat !important; }"+
  ".removeAddonButton span span span span strong { background: transparent url("+removeAddonBBorder+") right top no-repeat !important; }"+
  ".removeAddonButton span span span span strong {right: -6px; padding: 10px 45px 0 6px;}"+
  ".removeAddonButton:after, .install-container:after {content:'.';clear:both;display:block;visibility:hidden;height:0;overflow:hidden;}"+
  ".removeAddonButton span { float: left; cursor: pointer; }"+
  ".removeAddonButton span * { display: block; float: left; position: relative; }"+
  ".removeAddonButton span span { padding: 0 0 0 6px; }"+
  ".removeAddonButton span span span { padding: 0 0 8px 0; }"+
  ".removeAddonButton span span span span { left: -6px; padding: 0 0 6px 0; }"+
  ".removeAddonButton span span span span strong { right: -6px; padding: 10px 45px 0 6px; }"+
  ".removeAddonButton span:hover, .removeAddonButton span:focus, .removeAddonButton span:active { background-position: 100% -300px; }"
);
loadMoreRules();
deCrapify();