// ==UserScript==
// @name        Scroll To Top
// @namespace   mattng
// @description A button on the bottom right allows you to scroll to the top
// @include     *
// @exclude     *mail.google*
// @version     1.51
// @downloadURL http://userscripts.org/scripts/source/125839.user.js
// @grant       none
// ==/UserScript==

if (!window||!document||!document.body||top!==self)return;
if (!console || !console.log) {console={};console.log=function(){}}

var CONSTANTS = {
    TIME:           400,        // Time in milliseconds to do scroll animation
    CHECKTIME:      5,          // Time in milliseconds to check for next scroll interval
    FPS:            15,         // Time per millisecond for each scroll interval
    SHOW_PERCENT:   1.2,        // Percentage of page scrolled down before button is shown
};

var OBJECTS = {
    animateTimer: null,         // Animation timer that tiggers the next check
    button: null,               // Button that is clicked to bring to top
    isShown: false,             // Flag that shows if button is shown or not
};

var IMAGES = {
    ARROW: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAGQCAYAAACUBmpoAAAAh3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjaVY7dCcQwDIPfPUVH8F/keJyjtNANbvxzSEq470EWwgjR9X1uOgbCSt6iIwEuPD31U6bzxJhFWcYtnaxrUk53TKbTIHuw70df+UszdNzhEWg4cWq162ViUlozaLTymJG7BLqc/ee5B8wVP0HTLCLBZoczAAAJ7GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjM1NCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjQwMCIKICAgdGlmZjpJbWFnZVdpZHRoPSIxIgogICB0aWZmOkltYWdlSGVpZ2h0PSI0MDAiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PvTX7CcAAAAEc0JJVAgICAh8CGSIAAAbIklEQVR42u3dd7RdZZnH8e+9yU0iaSSGhJ4GCCi9hTIoigVHENQZwYY6Cs4gIEUdAbGwRLDMKFgAqSKgCDYEpENAAgYEBEIQSAgkkEZCCik35Gb+ePaZXMjN5Zaz99nl+1lrL9YSjSvP2ed33v3u533fJqT8GQSMAXYD9gd2BzYCNkn+/WpgJtACbLqeP6MNeBb4B3BT8s9ngTnJ/17KjSZLoJxoBt4CvAs4FNg2Cd9+dfizVwFLgReBO4AHgEnAtOTfSVKlDQMOBH4OPJ+MVtekfLUl/19XJKH/Zj8GSVWdfvgwcC+wJIPwXd+1ApgMnAJs6cciqSoBfChwczJdsCYnVxvwCHCsI2RJZdUE7AP8OWcB/PprZTJKPwTo78cmqSwGACcSL8vWFORaApwHjPXjk1R0WwLnAssKFMLtr0nJSF6SCmk/olWsraAhXLtmAEcQLXaSVKgQnlrwAG5/LQS+QiwikaRcawI+AjxdohBuP2/8NXyJJynn3g/MLWEI167lwHG4KlWS0xENveYBHzeMJRnCjQ/jw/zYJeXFW4HHKhTCtetJYC8/fkmNtglwSwVDuHbdDYzzNpDUKIOBiyl+n3Bvr18Dw70dJGWtBTgdaK14CNc2DDof2MDbQlJWmoAjaez2lXm7VgCn4YIPSRl5J/CC4dvhgo8jsa1NUsqq2iHR1Wsusd+yJKWi6h0S3Wlrc8c2SXU3HLgEOyS6et0HbOVtI6le+gHfM4S7fd2cPEVIUq80AScTm90Yrt1va7sE2NDbSFJvHAHMN1R7fL0KnJE8VUhSt+1PnE5hoPZ+68yTsK1NUjdtDzxqiNbtmp88XUhSl2wJ3Gp4pnL23b94e0l6I8OAywzN1K4pwM7eZpLWp9amttrATPW6HRjr7Sbp9ZqIF0q2qWVzXZU8fUjS/zucOP7HkMyux/jHeCK0gD6WQMQLpJ/jKrCsn0B2JPZznpSEs6SKsk2tsddC4GPYYyxV1hbYppaHaxZwgLejVD22qeXrehzb2qRK6QecjW1qtrVJaog+wFeBZQZfLq8rsa1NKrUm4sXQAgMvt9dqooPlTd6u1RodqToOAM4DRlqKXP9Y7kC0td1H9BtLKomdiRdCjjqLcS0GPultK5XHWOA2w61w12zgvd6+UvENI14AGWzF3a1tD29jqbj6Az/CQz+Lft0FjPN2lorHNrVyXddiW5tUKE3EsTy2qdnWpoKMmlQ+7wDOxza1sv24vg3b2qRC2Anb1Mre1vYJb3Mpv8Zgm1oVrjnAId7uUv5sCFxhSFXmegKY4G0v5UetTc3d1Kp13YttbVIu9AG+gm1qVb2uA0b4NSj+l1jF1QR8FPguMNhyVNJWwHDgDqKjQgaxMvYeok3NEVG1f4x3BFYSbW2rLYlBrOzsTmxp6YkO6kO8uJsFPGQ5pGyMBe7E+VGvddvaDvbrIaVvGHCNoeOFbW1SQwwi5oRtU/Pq7PortrVJqegHnEq8GTdsvN7o+gswyq9NMfiyrjg+BZwJDLAU6oLxRFvbXURHhQxi9dLBwDm4H626ronYAGoVsQLPtjaDWL0wAfgpMNpSqJuagb2AecADlsMgVs+MI3qFd7EU6qEW4sy7aURHhQxidcMo4BfAAZZCvTQQ2DUZFc+0HFLXDE1C2EM/vep5TSb2ppAjYnXhUfLLwPHEHJ9UL5sC2wC3Aq9YDoNY63cUcAbRNyzV23ii+2YitrUZxOrQvwHfJ07bkNJQa2trJdraPITUIFY7+xLHpW9mKZSyWlvbEuB+y2EQK2wLXJL8U8pCC7Ab8CwwxXIYxFW3GdErvK+lUMYGEj3Gk4HnLYeqakPgYmyr8mrs9bBPY46Iq/xoeBpwDPECRWqUjYm2tjuIeWMZxJXQDJwAfA3b1JQPtba2u4AVlsMgroJ/B84ChlgK5chOyT8nYlubQVxy+wMX4Kbdyp8m4lDaxcDfLIdBXFY7EC/nXO+vvLKtzSAutdHEvsIe7Ki8G5iMjG1rM4hLZSjwA+BQS6GCGEasvrsHmGs5DOKiGwCcDXwW29RULCOJabSJwCLLYRAXVV+iTe1EYu5NKprxwAjgdtytzSAuqMOT0fBAS6ECexvQH7gTDyE1iAvmQGI3tRGWQgVX2zpzGbFb2xpLYhAXwZ5JCI+zFCqJFqKTYjrwuOUwiPNuDHA+0YsplcmbgL2JQ0ifsxwGcV4NJ7a0fLelUEkNSUbGtrUZxLk0kHgxdwS2qancRhFtbXdhW5tBnCMtRJvaCUTLmlR2trUZxLnzSWI3tTdZClXIDsBgYh/jVy2HQdxIhwI/JpaESlXSlITxcqKtza0zDeKG2Av4GbGhj1RFLUS75nTgMcthEGdtHLGl5Y6WQhU3ANiHOPtuuuUwiLMykugVfoelkICYK96VmKJ40XIYxGkbAnyXOO7INjXptQOUrbGtzSBOWQtwMvAlayd1aCywKXArHkJqEKfkGOCbxE5Ukjq2HTAI29oM4hR8mFg5t6GlkDrVRLzEXkYcQmpbm0FcF3sTu6ltbimkLqm1tU3DtjaDuA62AS5NHrckdd0AYD/gCeApy2EQ99SWxIKN/SyF1CODgJ2JE6FfsBwGcXcNBb5PzA1L6rmRwLbEy7uXLYdB3FUtwLeAo7FXWKqH0cShCbcQe1PIIO5UM3A88FWgn+WQ6mZrYkHUXcAqy2EQd+YjRJvaUEsh1X2QsxPwCra1GcSd2A+4ANjYUkipZc4EYAbwD8thEL/eLsCFyeOTpPT0I3rzpwBPWw6DuGY08JPkl1pS+mxrM4hfYyhxwsbBlkLKVK2t7XYqvltb1YO4P3Am8BlsU5Ma9TS6NdHWtswgrp4Wok3tJGxTkxppK6KtbSLQahBXy8eB7wED/R5IDdVEzBcvB+6jgm1tVQ3ig4iXc8P9Dki50Ewcxjsb+LtBXH67Exv5jPPel3KlH7F15lPAkwZxeY0GzgP28J6XcmkQ0dM/GZhlEJfPsGQk/D7vdSnXRhAnfNxGRXZrq0oQDyZOXv4YMRclKd82B8YTh5CWvq2tCkHcApxItKn19f6WCqMybW1VCOLPAt8hjm2RVByVaWsrexAfAvwPtqlJRdVM7AGzgHiBZxAXzB7Ey7kx3stSobUAuwHPAFMN4uIYC1yUPNZIKr5BxBqA+ylhW1sZg3gTolf4AO9dqVSGA7sSh5AuMIjzawixm9rh3rNSKW1CtLXdASw1iPOnL/DfxI5q9gqnrw23Du3IyuR7ZW3SszWxNmBiUm+DOEf+Ezid2GNY6ZoL3Ahsg3tav96VwGJiOb3SszPwKnAPJWhrK8vI8UPA13FLyywsIBbHXOWor0NTiQVEnsWW/iDyJOCoMvxlyhDE+wD/C4zy3szksfubwK9waqKz79SDwJcp2QulHBqYPAUfZhA31vZEr/CW3pOZuAD4hWXokj8CX6PCx/9kZBTwfWL7TIO4ATYHfgjs5L2YiT8AZwArLEWXrAEuIw6mXW05UjU+GSRsbxBnawjwbdzSMisPER0p8yxFt6wkjuP6dRLMSs9OycBsc4M4Gy3AKcCnvPcy8SIx3/mkpeiRl5P63WEpUve+ZIA2xCBOVx/gWOCL2DaVhYXJj97tlqLXP2bHA1MsReo+ldyzLQZxemxTy04rsZn+ZT5W18VjwJeSUFa6g7UvAv9VpHwrUhC/g2hT29B7LXVrgHOTyxCun1uBU6nI8T8NNBA4DTjUIK6vnYi3z5t5j2Xi18lo2A6J+v/A/ZJ4qdRqOVI1gtiLfB+DuD62IPoEd/TeysTdRIfES5YiFauTgPilpUjdaOCnwHYGce8MAc4C3u09lYkpxNzac5YiVcuIF0p/tBSp25kCtLXlOYj7E8tpP+q9lInngeOIl0pK3zzgq8DfLEXqDiLnbW15DeI+wDHA0dimloWFxMuN2yxFpp4keoynW4rU5bqtLa9BXGtT28D7J3WtxPTPryxFQ0xMAmKhpUh9cFdra8vdZlV5DOK3Y5taVmptaudQ4qPKC+A3xDTcSkuRqoFE+2DudmvLWxDbppZ9AJyFbWp5+EG8APgJ9m2nbSOia2Vvg7hjWxAbpLibWjbuJl4WzbcUubAi+VH8jaVI3Whi+9zctLXlJYhrbWrv8R7JhG1q+TQ/+XG821KkLldtbXkI4n7YppYl29Ty7TliT4qnLEXqDgK+RRxEWukgtk0tW7apFcPfgRNw2igLR5KDtrZGB/Fh2KaWFdvUiuVG4qilpZYi9cHgscQp8A1ra2tkENfa1IZ5L6RuDfFG/lxsUyuKNmIL0h8BqyxHqhq+W1ujgnhHok1tc++BTFxN7Ka23FIUyirWHrWkdG2UDAwb0tbWiCCu7aZmm1o27sE2tSJbQiyDvslSpK5hu7VlHcRDkpGZbWrZeIJoU5thKQptDnAi8IilSN0uwA/IeFFZlkHcD/gGcLifdSZqbWqPWopSmAKclHyuStf7ybitLasg7pOMzL6AbWpZWEh0o9xqKUrltuRzdYOg9H2a6FrpW6YgPgw4HdvUstAKnA1cbilK6fLk8/WopfQHj5m1tWURxPtjm1pW1hAvG9xNrbzaks/3QkuRukHJE0jqbW1pB7Ftatm6GjgT29TKbjkxh3mtpUhdbbe2CUUN4s2JHsid/SwzYZtatcwlDnmdZClSN4bYrW3bogVxrU3tvX6GmbBNrZqeJjopplmK1O1C7NaWSltbGkFca1M7ws8uEzOxTa3KJgHH+ySUidTa2uodxLapZWsRtqkJbiC6knw3kL5Pk0JbW72D+FBsU8tKK9GNYpua2oBLiE2dVluOVKXS1lbPIN6f2CnKNrVsXES8DPWLJ1h71NLVeO5d2mptbR/MWxDvgG1qWbqWONXER1G1t5DYIGiipUhdbbe2urS11SOINyd2U7NNLRv3Em1Lcy2FOjCLeHn7hKVI3Rjq1NbW2yAejG1qWXo6+ZI9bSnUiX8QnRQzLUXq6rJbW2+CuG8yMrNNLRtzgC8CD1oKdcEtxDzmIkuRun8lpgp73NbW0yBuIlrUjsM2tSwsTb5UN1sKdcPlxDymGwSl7zPJwLRHbW09DeJDkmAYZP1T10q8CL0M34are1Ynj81XWIrU9UkGpl+gB21tPQni3Ym2qZHWPhNXEPPwjmrUE68kI7XrLEXqetzW1t0gHke8JdzGmmfiuuRL9IqlUC/MJTaEesBSpG4kMR20V1pBvDGxHdwe1joT9ydfHtvUVA9PED3G0y1F6sYA5xEdFXUN4jcDPyHmhpW+6cRhkfaCqp7uBL6CRy1lYWdifr5Li9y6EsS1jXwOJYMjQ8RLRA/ovZZCKfgdcAa+c8jCO4mtM4fWI4g/ApyMbWpZWEFsmnS9pVBK2pLH5p9hF04WPkxMCfXtTRDvRbyxH2I9U7eK2DTpYjxvTulaThypdY2lSF2f5An36M5mFDoL4k2IOY6x1jITVyc/eisshTIwj5gvdgosfYOSJ92DuhvEA4BTgH2tYSZuIaZ/FlsKZejZZLT2jKVI3chkoDWuO0F8BPA5fDmXhQeBE4DZlkIN8ACxh8kcS5G6HYluqAFdCeI9iXOZBli31E1PRsKPWwo10E3Jo7MLh9L3GeDgNwri/sBRwBbWK3UvE3N0d1oKNdga4FLgHOBVy5GqDYh24GGdBfEeRLuF0tUKfJvo6ZTyck/WjlpSuvbjddsHtw/iJuBDwIbWKVVtycjjfGxTU74sBk7CU8HT1peYedi4oyDeCzd5z8JvibenyyyFcmg28fL4UUuRqrfS7mSj9kH8ifYJrVRMJF7OLbAUyrHHkpHxLEuR6qj4gFoG14J4KLHPsNLzKHAMniOmYriF6KR42VKkZh9g0/ZBvFsyVFY6ZiQjjMcshQrkUuKE9lWWIhVjgQPbB/FheOxRWhYBpyUjDKlI2li7/4nqry/waWBYM9HPtps1ScUq4lipKy2FCmoZ8A3cETAtbwPe0kwsu9vWetTdGuDnyYjCNjUV2Rxi8dHfLEXdDQQ2a04S2W0u6+9a4DvYpqZymELsk+BRS/U1AJjQDGyPm77X273JCMLz5lQmfyXOUbSTor7GNtONA+7UJU8SbWqOHFTWJz2PWqqvcc3ACOtQN7OI/V0fthQqqdpRS+fhUUv1slEzsWGxem8x8Xb5JkuhkltGvP+41lLUxWbNdOGEUb2hVcCPgcsshSpiLvEeZJKl6LWmZmtQF5cQWwi6l6uqZDoxFTfNUvSOQdx7fyDW5NumpiqaTLS1uZGVQdww9xPtPJ73pSq7jljG71FLBnHmpgHHAv+0FKq4NuAi4FycnutxEC+3DN02NwnhyZZCAtYetfRbS9Fty5tx8+fueoVoU7vRUkivsYjopLjbUnTLrGbgeevQZauSx6+LsZld6shM4DicsuuO1c3A361Dl11FNLK7vFNav4eJtrYXLEWXTG0GHjJYuuQGokNiqaWQ3tBfiCm8JZbiDT3YDDwBLLQWnZpMzH3NthRSl11KrDj1qKX1W0UyRzwLX9h15lmiYf1xSyF1y6vA2cSUnjr2AjCpmViMcJ/16NAC4EvAPZZC6pGlxJTeDZaiQ1OBGbUFHff4+LCOFcA3iVVDknpuNjG195ClWMckYFktiO8g5ooVVgHnABfieXNSPTwOfBl4zlK85gfq97B2ifNsR36vcRVxCoGrDqX6uQ34OrHwQ/AI8FT7IIbYRWy+teFGbFOT0nIF8ENgdcXrsBq4pjbYax/Ej+LSxMnJ45NtalJ6AXROMvCrsqm0O82nfRCvJDY4r+q+ujOAk7BNTUrbIuBUqvvyri3J2uc7CmKIOZwqtpksJNrU3KxEysaTxBRgFZdB3wf8sv1/8PogXkbM31Tp0XwZsam1LyulbN1CtLUtrlje/AiY11kQQ5w6cVFFilLbTe0ifHkgNcJvgJ9W6Pt3I3B9V//Lo4Bbia0ey3xdDgzyu9AjHySWsK7xes11qrdGtw1NBkNlvzceBXbobnH2JfYWLWtR7gfG+R0wiA3iXNiCWOFb1vtiCfCx9f3lOzuz7q/AtylnP+0M4GQ8BlzKi+eB/wQeKOHfbTWxC93VPf0D+hKT6a0l+mV6Fnif970jYkfEubQHMKVE98Nq4AJgcG8LM5C1e4oWvSgLgMO81w1igzjX9if2vinD/XApMLxehRmchHGRR8bzgC8AfbzPDWKDOPfem0whFvU+eDWZitis3oUZyNqevyJOR3yAzufEZRAbxPlyILH6rmj3wCpi58bhaRWmBTiqYL9UU5JfVxnEBnHxjAd+RywLLkp3xNeJlrxMJtRvK8Ak+Z+A7byXDWKDuNBGEEcuLcr5Zz8NOBzol2VxNiOWQ7+Uw4LUNvAZ4T1sEBvEpdBCvGh/PIef+VLgZ8D2QFMjitMXOIDY0m4F+XghdyGwm/etQWwQl9JWwHeJ9z55eOqeAnw+61Hw+gwGjgDupTGdFbUAnpD8csogNojLqxnYltg8Z34DPuNWYge1U4At81igNxPL+P6cTFqn/Ws01wA2iA3iSk9XTEgy4DnSXevQRnSM3QwcnWRdXacW6ukl4Ergj8CeRLfCu5Jfr4F1mD9pS34BHyf2Tb6ZaPz2BGqpelYlI9MHib0q3p4MBHdJntLrMV3QmmTMzUmuPUIK2z70TalArxAnQ98JDCMmsfdNCjQmKdqwpFAdLbBYQ5wY0kps2v48sQb94eR6ijjraY33omQgEx0L04hFFFsDmwD7JQPCjZMR7IZAfzpeT7AqyZSXif3YZyYhPx2YmAwAUzvRvW/KBaotK74nufokI+ONk2tToul5TQe/QjOSR4HZSRgvNXgldWEQWBuw/SUZ7A1JBn6bAKOTDHq92cRpIbW8WZ7lk3bfjIu0OgnXxcA/vWckpTwQXEm8zJ+X58xxya8kGcSSZBBLkgxiSTKIJUkGsSQZxJIkg1iSDGJJkkEsSQaxJMkgliSDWJJkEEuSQSxJMoglySCWJBnEkmQQS5IMYkkyiCVJBrEkGcSSJINYkgxiSZJBLEkGsSTJIJYkg1iSZBBLkkEsSTKIJckgliQZxJJkEEuSDGJJMoglSQaxJBnEkiSDWJIMYkmSQSxJBrEkySCWJINYkmQQS5JBLEkyiCXJIJYkGcSSZBBLkgxiSTKIJUkGsSQZxJIkg1iSDGJJkkEsSQaxJMkgliSDWJJkEEuSQSxJMoglySCWJIPYEkiSQSxJBrEkySCWJINYkmQQS5JBLEkyiCXJIJYkGcSSZBBLkgxiSTKIJUkGsSQZxJIkg1iSDGJJkkEsSQaxJMkgliSDWJJkEEuSQSxJMoglySCWJBnEkmQQS5IMYkkyiCVJBrEkGcSSJINYkgxiSZJBLEkGsSTJIJYkg1iSZBBLkkEsSTKIJckgliQZxJJkEEuSDGJJMoglSQaxJBnEkiSDWJIMYkmSQSxJBrEkySCWJINYkmQQS5JBLEkyiCXJIFZpbAr0sQySQazGGW4JJINYkgxiSetosQQyiKXGGgc0WQYZxFLj9LMEMoglySCWJBnEkmQQqwLWWALJIFZjPQu0WYZ1vOKPlAxiGTiNNd0SyCBWVl51RNwhf5xkECszM4EllmEd/jjJIFZmVgCtlmGdEJ5hGWQQKytzDJ11tALzLYMMYmVlMdE5obVmAlMsgwxiZfkY/qhleI1ngHmWQQaxsnQnvrBrbyqw0jLIIFaW5hBTFILlwPWWQQaxsjYTeMgyADAb+KdlkEGsrK0A/oSLGAAmAbMsgwxiNcJEbGNrBX5HrDaUDGJl7kngqorXYCpwr7eCDGI10q8q/lh+HfCit4EMYjXS08QURRW9CPzeW0BSHuxIrLRbU7HrLDy1WVKOnFmxEH4K2MGPXVKebAdMq0gItwKf8yOXlEefJ1aZlT2IrwEG+3FLyqMNgItLHsLPARP8qCXl2XjgvpKG8HLgWD9iSUWwN7EtZJlCuA34AdDfj1dSURwMzC1JCK8GLgGG+7FKKpIm4EhgQQmC+EZgpB+ppCLqQ3RSzC/wSPh6YCs/SklFHxkfQXQbFCmEVwAXAiP8CCWVxbuJc+7aChDCs4gFGwP92CSVzXhi28wV5Lcz4nai68M9JCSV1mDgP4i9GvIUwi8ApwOj/IgkVUETsC1wLo3vqlgEXADsiVvDSqqgPsAHgBuSQM5y/ngJcDlwENDPj0JS1W0A7AGcAjxILCVOI5RfBaYT+wi/Cxhg6ZWHx0Mpb0YR+/y+nXhptj0wrIeh2QbMI5ZbPwfcDNxNbNfZZqllEEtvbAgwOgnjdwK7AuPofKnxaqL97BngJuAO4oDP5cAqS6q8+T+P/gU//ghx1gAAAABJRU5ErkJggg==',
};

/*=======================*\
        FUNCTIONS
\*=======================*/
function createEl(elementName, id /*optional*/, attrArr /*optional*/, parentEl /*optional*/) {
    var el = document.createElement(elementName);
    if (id) {el.id = id;}
    if (attrArr) {
        for (var attr in attrArr) {
            el.setAttribute(attr, attrArr[attr]);
        }
    }
    if (parentEl) {
        parentEl.appendChild(el);
    }
    return el;
}

function createText(txt) {  
    return document.createTextNode(txt);
}

function appendCSS(obj) {
    var cssString = "",
        propString = "",
        eachSelector = "",
        style = createEl("style");
    for(var selector in CSS) {
        eachSelector = CSS[selector];
        propString = "";
        for(var property in eachSelector) {
            propString += property + ":" + eachSelector[property] + ";";
        }
        cssString += selector + "{" + propString + "}";
    }
    style.appendChild(createText(cssString));
    document.head.appendChild(style);
}

function show() {
    if (!OBJECTS.isShown) {
        OBJECTS.button.className = "show";
        OBJECTS.isShown = true;
        OBJECTS.button.addEventListener("click", onClick, false);
    }
}

function hide() {
    if (OBJECTS.isShown) {
        OBJECTS.button.className = "";
        OBJECTS.isShown = false;
        OBJECTS.button.removeEventListener("click", onClick, false);
    }
}

/*=======================*\
        ANIMATION
\*=======================*/
function animateScrollUp(startTime, intervals) {
    if (OBJECTS.animateTimer) {
        clearTimeout(OBJECTS.animateTimer);
        OBJECTS.animateTimer = null;
    }
    
    // Get the correct windowY and scroll there
    if (window.scrollY > 0 && intervals.length > 0) {
        var interval = intervals[intervals.length - 1];
        var now = new Date().getTime();
        if (interval.time + startTime < now) {
            do {
                interval = intervals.pop();
            }
            while(intervals.length > 0 && interval.time + startTime < now);
            window.scrollTo(window.scrollX, interval.scrollY);
        }
    } 
    if (window.scrollY === 0) {
        // Finished
        window.addEventListener("scroll", checkNeedToShow, false);
    } else if (window.scrollY > 0) {
        OBJECTS.animateTimer = setTimeout(function(){
            animateScrollUp(startTime, intervals);
        }, CONSTANTS.CHECKTIME);
    }
}

/*=======================*\
          EVENTS
\*=======================*/
function onClick(e) {
    var segments = Math.floor((CONSTANTS.TIME) / CONSTANTS.FPS),
        scrollBy = window.scrollY/segments,
        startTime = new Date().getTime(),
        intervals = [];
    for (var i = 0; i < segments; i++) {
        intervals.push({
            scrollY: i * scrollBy,
            time: (segments - i) * CONSTANTS.FPS
        });
    }
    window.removeEventListener("scroll", checkNeedToShow, false);
    animateScrollUp(startTime, intervals);
    hide();
}

function checkNeedToShow() {
    var browserHeight = window.outerHeight;
    var scrollY = window.scrollY;
    if (scrollY > browserHeight * CONSTANTS.SHOW_PERCENT) {
        show();
    } else {
        hide();
    }
}

/*=======================*\
          START
\*=======================*/
OBJECTS.button = createEl("div", "scroll-to-top-from-script", null, 
    document.body);
createEl("div", "scroll-to-top-from-script-image", {
        title:"Click to scroll back to the top!"
    }, OBJECTS.button);

window.addEventListener("scroll", checkNeedToShow, false);
checkNeedToShow();

/*=======================*\
           CSS
\*=======================*/
var CSS = {
    "#scroll-to-top-from-script" : {
        'height' : '75px',
        'width' : '75px',
        'visibility':'hidden',
        'position' : 'fixed',
        'bottom' : '100px',
        'right' : '50px',
         '-moz-transition-property' : 'visibility',
        '-moz-transition-duration' : '0.3s',
    },
    '#scroll-to-top-from-script-image' : {
        'height' : '75px',
        'width' : '75px',
        'background' : 'no-repeat url("'+IMAGES.ARROW+'")',
        'background-position' : 'center center',
        'background-size'   : '50px 50px',
        'background-color' : 'rgba(255,255,255, 1)',
        'opacity' : '0',
        'border-radius' : '10px',
        'box-shadow' : '0 0 10px 3px',
        '-moz-transition-property' : 'opacity',
        '-moz-transition-duration' : '0.3s',
    },
    '#scroll-to-top-from-script.show' : {
        'visibility':'visible',
    },
    '#scroll-to-top-from-script.show #scroll-to-top-from-script-image' : {
        'opacity' : '0.6',
    },
    '#scroll-to-top-from-script.show #scroll-to-top-from-script-image:hover' : {
        'opacity' : '0.9',
         'cursor' : 'pointer !important',
    },
}
appendCSS(CSS);
