// ==UserScript==
// @author         unknown
// @name           like-it-now
// @namespace      MData
// @description    Automaticly reversing 
// @version        1.2
// @include        http://www.like4like.org/user/earn-facebook.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

VERSION BUILD=8300326 RECORDER=FX
SET !ERRORIGNORE YES
SET !TIMEOUT_TAG 1
SET !TIMEOUT_STEP 1
SET !TIMEOUT_PAGE 30
SET !REPLAYSPEED FAST
TAB T=1
URL GOTO=http://www.like4like.org/user/earn-facebook.php
TAG POS=1 TYPE=IMG ATTR=ALT:Like
TAB T=2
FRAME F=0
TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton
WAIT SECONDS=5
TAB T=1
TAB CLOSEALLOTHERS
WAIT SECONDS=3
TAG POS=2 TYPE=IMG ATTR=ALT:Like
TAB T=2
FRAME F=0
TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton
WAIT SECONDS=5
TAB T=1
TAB CLOSEALLOTHERS
WAIT SECONDS=3
TAG POS=3 TYPE=IMG ATTR=ALT:Like
TAB T=2
FRAME F=0
TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton
WAIT SECONDS=5
TAB T=1
TAB CLOSEALLOTHERS
WAIT SECONDS=3
TAG POS=4 TYPE=IMG ATTR=ALT:Like
TAB T=2
FRAME F=0
TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton
WAIT SECONDS=5
TAB T=1
TAB CLOSEALLOTHERS
WAIT SECONDS=3
TAG POS=5 TYPE=IMG ATTR=ALT:Like
TAB T=2
FRAME F=0
TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton
WAIT SECONDS=5
TAB T=1
TAB CLOSEALLOTHERS
REFRESH