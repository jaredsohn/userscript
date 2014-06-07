// ==UserScript==
// @name           Cleverbot Vs. Cleverbot
// @namespace      qwerfd
// ==/UserScript==

import urllib2
import md5
#import hashlib
import re

class ServerFullError(Exception):
	pass

ReplyFlagsRE = re.compile('<INPUT NAME=(.+?) TYPE=(.+?) VALUE="(.*?)">', re.IGNORECASE | re.MULTILINE)

class Session:
	keylist=['stimulus','start','sessionid','vText8','vText7','vText6','vText5','vText4','vText3','vText2','icognoid','icognocheck','prevref','emotionaloutput','emotionalhistory','asbotname','ttsvoice','typing','lineref','sub','islearning','cleanslate']
	headers={}
	headers['User-Agent']='Mozilla/5.0 (X11; U; Linux x86_64; it; rv:1.9.1.8) Gecko/20100214 Ubuntu/9.10 (karmic) Firefox/3.5.8'
	headers['Accept']='text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
	headers['Accept-Language']='it-it,it;q=0.8,en-us;q=0.5,en;q=0.3'
	headers['X-Moz']='prefetch'
	headers['Accept-Charset']='ISO-8859-1,utf-8;q=0.7,*;q=0.7'
	headers['Referer']='http://www.cleverbot.com'
	headers['Cache-Control']='no-cache, no-cache'
	headers['Pragma']='no-cache'

	def __init__(self):
		self.arglist=['','y','','','','','','','','','wsf','','','','','','','','','Say','1','false']
		self.MsgList=[]

	def Send(self):
		data=encode(self.keylist,self.arglist)
		digest_txt=data[9:29]
		hash=md5.new(digest_txt).hexdigest()
		self.arglist[self.keylist.index('icognocheck')]=hash
		data=encode(self.keylist,self.arglist)
		req=urllib2.Request("http://www.cleverbot.com/webservicefrm",data,self.headers)
		f=urllib2.urlopen(req)
		reply=f.read()
		return reply

	def Ask(self,q):
		self.arglist[self.keylist.index('stimulus')]=q
		if self.MsgList: self.arglist[self.keylist.index('lineref')]='!0'+str(len(self.MsgList)/2)
		asw=self.Send()
		if '<meta name="description" content="Jabberwacky server maintenance">' in asw: raise ServerFullError, "The Cleverbot server answered with full load error"
		self.MsgList.append(q)
		answ_dict=GetAnswerArgs(asw)
		for k in self.keylist:
			if k in answ_dict: self.arglist[self.keylist.index(k)]=answ_dict[k]
		self.arglist[self.keylist.index('emotionaloutput')]=''
		reply_i=asw.find('<!-- Begin Response !-->')+25
		reply_s=asw.find('<!-- End Response !-->')-1
		text=asw[reply_i:reply_s]
		self.MsgList.append(text)
		return text

def GetAnswerArgs(text):
	results=ReplyFlagsRE.findall(text)
	list={}
	for r in results: list[r[0]]=r[2]
	return list

def encode(keylist,arglist):
	text=''
	for i in range(len(keylist)):
		k=keylist[i]; v=quote(arglist[i])
		text+='&'+k+'='+v
	text=text[1:]
	return text

always_safe = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'
               'abcdefghijklmnopqrstuvwxyz'
               '0123456789' '_.-')
def quote(s, safe = '/'):   #quote('abc def') -> 'abc%20def'
	safe += always_safe
	safe_map = {}
	for i in range(256):
		c = chr(i)
		safe_map[c] = (c in safe) and c or  ('%%%02X' % i)
	res = map(safe_map.__getitem__, s)
	return ''.join(res)


cb1 = Session()
cb2 = Session()

begin = cb1.Ask("Hello")
print "- " + begin
it1 = cb2.Ask(begin)
print "- " + it1

while True:
    it2 = cb1.Ask(it1)
    print "- " + it2
    it1 = cb2.Ask(it2)
    print "- " + it1