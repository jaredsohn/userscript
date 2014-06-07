{\rtf1\mac\ansicpg10000\cocoartf824\cocoasubrtf480
{\fonttbl\f0\fswiss\fcharset77 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\ql\qnatural\pardirnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name          Hello World\
// @namespace     http://diveintogreasemonkey.org/download/\
// @description   example script to alert "Hello world!" on every page\
// @include       *\
// @exclude       http://diveintogreasemonkey.org/*\
// @exclude       http://www.diveintogreasemonkey.org/*\
// ==/UserScript==\
\
int kid = 1;\
int locker = 1;\
int number = 1;\
int open = 0;\
int solved = 0;\
int i = 0;\
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\ql\qnatural\pardirnatural
\cf0 char locker[1002;\
\
\
while (kid < 1001)\
\{\
while (locker < 1001)\
\{\
while ((number < 1001) && (solved == 0))\
\{\
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\ql\qnatural\pardirnatural
\cf0 if (locker[i] / kid == number)\
\{\
solved = 1;\
\}\
\
else\
\{\
number = number + 1;\
\}\
\}\
number = 1;\
locker[i] = solved ^ locker[i];\
solved = 0;\
i = i+1;\
\}\
i = 0;\
kid = kid + 1;\
\}\
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\ql\qnatural\pardirnatural
\cf0 \
while (locker < 1001)\
\{\
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\ql\qnatural\pardirnatural
\cf0 open = locker [i] + open;\
i = i+1;\
\}\
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\ql\qnatural\pardirnatural
\cf0 alert(' (open) ');}