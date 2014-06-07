// ==UserScript==
// @name          GagaTube
// @description   transform YouTube comments into reasonably glamorous ones
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// Written 2010 by Peter Swire, based off of Julien Oster's FeynTube
// Quotes from GreatPersonalities.com

var quotes = ["I'd love to have my own collection. It's something I want to accomplish. I find Donatella a fashion icon and in many ways fashion and music go together. ",
"I don't have that many days off. But Sundays used to be the day my family would always make fresh food at home. So sometimes I like to let myself eat what I want on a Sunday, I'm on a very strict healthy pop star diet. I don't eat bread, just vegetables and salad and fish. Eating like that is much better for me anyway but on Sundays I sometimes eat pasta. ",
"I live right here in the moment, I live on stage. I don't own a house, I don't spend money on those things. I live out of a suitcase and I make music and art and I spend every dollar that I make on stage - that's it. ",
"I was really excited about winning the first two awards, but this one means more because I worked so hard on this album for so long, and when I think about all that I went through and all the years of struggling and my fans - they were the first ones to recognise my abilities, ",
"Thank you so much, I love my fans, thank you so much for everything. ",
"look what i did last night. little monsters forever, on the arm that holds my mic...chola tattoo from shamrock, so proud. ",
"Backstage getting ready, feels like you're here with me tonight little monsters. Thank you for a beautiful year full of love and music.Iloveu. ",
"This is not an award for me, it's for my fans, And I love my fans so much. And I wanted them to know that they should believe in themselves. And I wanted to be everything that they hoped I would be tonight, and that's what we got to do. ",
"Related Quotes: 52nd Grammy Awards",
"I ruined all of my make-up right before the show. Crying... I was just so happy. ",
"I'm just so happy, I can't say enough and Elton was so amazing and the performance was really truly magical, I had been fantasising about this performance piece for a while and we got to do it... and I'm just really truly floored. ",
"The rumors I am a dab hand in the kitchen are completely true, I come from an Italian family - what more can I say? I love to cook. I am really good at Italian food. So I make great meatballs, pasta and all sorts. I love it. When I get the chance I make a mean meal. Mmm. ",
"Just to give you an idea, the stage is about four times the size of the one we're on now and conceptually, it's completely different. One thing that has been lost over the past 10-15 years, in pop music, is the idea of showbiz. And this is definitely going to bring that back. ",
"For the next version of the Monster Ball, which is going to be in February when I begin in the UK with my arena tour, I'm throwing out the stage, My team thinks I'm completely psychotic. But I don't f***ing care what they think. ",
"Well, that's your opinion, isn't it? And I'm not about to waste my time trying to change it. ",
"I find The Fame Monster to be completely different than The Fame. I've evolved, but artists should evolve. In the '70s and the '60s, artists evolved all the time - from album to album the music was changing, the feeling was changing, the artists seemed almost entirely different than who they were five or six years before. ",
"Most certainly I have no f***ing clue what they're going to be yet, because I'm just starting this tour, and I wrote The Fame Monster during the last tour, so... I assume that it will inspire some kind of new sonic energy and lyrical style, ",
"Well, I'm going to write new music... that's the beauty of writing your own music - you don't have to rely on songwriters and producers to write hit songs for you, So I'm going to write a new album and I'm going to have new ideas. ",
"Well, I'm going to write new music ... that's the beauty of writing your own music - you don't have to rely on songwriters and producers to write hit songs for you. So I'm going to write a new album and I'm going to have new ideas. ",
"I assume that it will inspire some kind of new sonic energy and lyrical style,... Most certainly I have no f---ing clue what they're going to be yet, because I'm just starting this tour, and I wrote 'The Fame Monster' during the last tour. ",
"I love Susan Boyle. She is my woman of the year. She has achieved more in this year than most artistes will in a lifetime, Our styles are different, but it would be great to work with somebody of that talent, ",
"Lady Gaga has a very bold, fearless image and, I have to say, I have so much respect for original artists who aren't afraid to do what they do. That's what I respect the most. She's awesome. ",
"I'm an outspoken and extreme dresser. I am inspired by photography and art, but mostly by New York. ",
"I was a bit insecure in high school. I used to get made fun of for being either too provocative or too eccentric, so I started to tone it down. I didn't fit in, and I felt like a freak. ",
"What has been lost in pop music these days is the combination of the visual and the imagery of the artist, along with the music - and both are just as important... When I'm writing music, I'm thinking about the clothes I want to wear onstage. It's all about everything altogether - performance art, pop performance art, fashion. For me, it's everything coming together and being a real story that will bring back the super-fan. I want to bring that back. I want the imagery to be so strong that fans will want to eat and taste and lick every part of us. ",
"That's what 'Poker Face' was all about... Why, when I was with my boyfriend, was I fantasizing about women? Um, uh... well I... my goodness! I have certainly had sexual relationships with women, yes. I do like women. I've only been in love with men - I've never been in love with a woman. ",
"I wrote it for her a long time ago, and she just didn't use it for her album - it's fine because I love the song and I get to perform it now. ",
"Happy turkey little monsters. ",
"This is really who I am, and it took a long time to be okay with that... Maybe in high school you, Ellen, you feel discriminated against. Like you don't fit in and you want to be like everyone else, but not really, and in the inside you want to be like Boy George - well, I did anyway. So I want my fans to know that it's okay. Sometimes in life you don't always feel like a winner, but that doesn't mean you're not a winner, you want to be like yourself. I want my fans to know it's okay. ",
"The whole point of what I do - The Monster Ball, the music, the performance aspect of it... I want to create a space for my fans where they can feel free and they can celebrate ",
"I didn't fit in in high school and I felt like a freak... So I like to create this atmosphere for my fans where they feel like they have a freak in me to hang out with and they don't feel alone. ",
"I wore studded leather jackets, me and my friends in New York... Lifestyle, grit, passion and love for music, freedom. These were the things I thought about when we were designing [the headphones]. So they really reflect a headphone that I just think is really great looking and represents who I am. ",
"Sending all my little monsters little pizzas for waiting all night for me at best buy... I hope you're hungry ... eat up I love u! ",
"She is such a beautiful person. I had kind of lost faith a little bit in meeting artists in the business - and then I met Beyonce. ",
"Related Quotes: Beyonce Knowles",
"We discussed having a very flowy red dress... But [the dress] arrived today and it's about 30-feet long! That was an adjustment. But nothing that I couldn't handle. ",
"Art is life, life is art... The question is, what came first? ",
"For me, art is a lie, and the artists are there to create lies we kill when we make it true... Francesco and I were like warriors on stage, trying to make a true moment. ",
"I love my work so much, I find it really hard to go out and have a good time. Something that I have or fear is never being able to enjoy myself ",
"I don't go to nightclubs. If I do, I'll be one whisky and a half into it and then I have to get back to work ",
"[my Jean-Paul Goude was] the inspiration that made the connection for me between the art world and the fashion world... He used to say things like 'If you want to make a shoulder pad, don’t research jackets-research sculpture, mineral rocks, paintings.' He thinks in a different way; he is the designer of the future ",
"I've always been an outspoken and extreme dresser. ",
"A message to all my little monsters: 'The Fame Monster' will come out four days before the first live show, You have exactly 96 hours to learn all of the lyrics so you can sing along. Dress accordingly. ",
"I'm married to Kanye, I love and admire him so much. As I say, we're married. ",
"Related Quotes: Kanye West",
"I'm a single girl. I like to have a good time. I just sleep with the guys in the band all the time because it’s easier. ",
"I truthfully adore Kanye. I always poke fun at him and joke around. We have a lovely creative relationship. He’s so sweet. I can’t say enough good things. He’s undeniably brilliant. ",
"I can’t give any details, but it will be one of the most important moments in music ever. ",
"I’ve gone bankrupt about four times now. My manager wants to shoot me. ",
"Every dollar I earn goes on the show. Now we're finally getting to a place where it's not bankruptcy. Then again, with another tour coming up soon I'll probably be homeless again. ",
"I think I have seven tattoos. I’m thinking of getting a Botticelli-esque version of the Virgin Mary on my back next. I’m very interested in body art. ",
"It's been a very remarkable year, And I feel very blessed. I lived an isolated lifestyle before the media. I lived a life of solitude and loyalty and commitment to my work. I just don't prioritize my life in the same way that other people do. The only thing that matters is my music and my performance. ",
"I am inspired by so many things. My favorite book, 'Letters to a Young Poet.' I was inspired by Helmut Newton for the 'Paparazzi' video. I'm inspired by fashion. I'm inspired by the moonlight. I'm inspired by sex and pornography and slasher films. ",
"I love all designers. I appreciate a life devoted to fashion, Right now, I'm having a very strong obsession mostly with clothing found in sex shops. I would venture to say that all that clothing was designed by gay men. ",
"It's not just a mask, it's a contemporary art piece ",
"My concerts are about me being very private in public, but I’m very protective. My apartment is my stage, and my bedroom is my stage - they’re just not stages you’re allowed to see. When you let a bunch of people in there, they [mess] with that energy and it becomes a circus. Put it another way: Everybody wants me to show my [privates] to the world all the time. And the truth is, I don’t have to. ",
"I'm not a go-out-and-party girl. I'm actually taking every minute I have to myself to write music and be in the studio right now. ",
"I should imagine that most pop stars don't experience that kind of gesture. I mean, it was a really big tattoo all the way down his arm. Pretty rock 'n' roll! ",
"This fan got this amazing tattoo on his arm, this massive Lady Gaga tattoo that was very intricate and very detailed and in it I was wearing this crystal outfit - but this thing was like an art piece. I was so flattered because tattoos are for life. ",
"Sebastian is incredible. He's so amazingly talented, Very kind. He likes it when my nip***s fall out. It's all of the things I look for in a good photographer. ",
"I want to do a fashion story so bad, fashion is my whole life. ",
"I haven't had a bad moment with any of them. I get along with them all really well. ",
"They are so nice and very sweet and I am very grateful to them because they have taken me all around the world and a lot of people found out about me thanks to those girls so I really can't say (which Doll had hit on her). ",
"I don't like to kiss and tell, the girls and I are very close! ",
"I'm dressed conservatively today, I should take off my pants just to freak them out! ",
"Right now I'm having a very strong obsession with clothing found in sex shops, so I'm going to take that to mean you're down with S&M. Working off that thesis, I'd like to verbally assault you for a minute and say that your whole sartorial shock for the sake of shock schtick is getting old. Real quick. Like Robin Williams in \"Jack.\" ",
"Because that's your fame. That's where your fame lives... my luminosity. My constant flashing light. It’s in my ability to know what I make is great. I know it is, I know it’s great, and it’s that sureness. That sureness is infectious. ",
"I saw him in a hotel but I was too embarrassed to go up and tell him. ",
"The moment I met her, I was like, 'Oh, she looks like a star' - she had this thing about her, That's the kind of artist I was looking for to showcase my music, a real artist in every way. ... She took it to the next level for every artist. ",
"Related Quotes: RedOne",
"I think what they're more genuinely drawing upon is the strong ambitious part more than anything. I think that's what - and I hope I'm not being hyperbolic - but I would like to think that's what I share with her more than anything, is my ambition, and my strength ",
"I went to art school, I studied pop culture, I know everything about music and iconography, pop, cultural and religious, I'm self-manufactured. . .. (I look) at it not as poison or lowbrow, but looking at it in a very highbrow way, and self-making myself to be a powerful visionary and say something that will genuinely speak to people. ",
"I think it's a terrible message to young people that you have to ruin your life in order to make music, because I don't think you have to, But it's just the way my brain and my heart and my obsession for love and art were functioning at the time. ",
"I'm kind of the odd person out in general, I don't really like hanging out with celebrities and I don't fit into that world, as I sort of keep to myself. So in a way, even in the new group of cool kids and the pop music world, I'm still the odd girl, but I'm OK with it; I like being the odd girl now, it's where I live. ",
"I don't appreciate when people call me Stefani, because if they don't know me, I feel like it's their way of acting like they do ... they're completely ignoring my creative existence... (Lady Gaga) is who I am. Me and my hair bow, we go to bed together. She sleeps where I sleep. "
	      ]

names = ["Comment by Lady Gaga"];//, "Comment by Little Monsters", "Comment by The Fame", "Comment by The Fame Monster"]

var allDivs = document.getElementsByTagName('div');

for (var i = 0; i < allDivs.length; i++) {
     div = allDivs[i];
     if (!div.hasAttribute('class')) {
        continue;
     }
     if (div.getAttribute('class').match(/floatL padT3/)
	 || div.className == 'watch-comment-info') {
   div.parentNode.style.padding = 0;
   div.parentNode.style.fontWeight = 'bold';
        commentText = names[Math.floor(Math.random() * names.length)];
        altComment = document.createTextNode(commentText);
        div.parentNode.replaceChild(altComment, div);
     }
     else if (div.getAttribute('class').match(/commentBody/)
	      || div.className == 'watch-comment-body') {
        commentText = quotes[Math.floor(Math.random() * quotes.length)];
        altComment = document.createTextNode(commentText);
        div.parentNode.replaceChild(altComment, div);
     }
}
