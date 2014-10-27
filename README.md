#Hash Market Calc Bookmarklet

I created this so people have an easier time with figuring out what the buyer will actually pay. I am guessing that GAW will actually update their own code to make this obsolete but until then, this should do the job. Unfortunately, because it's a bookmarklet you will have to click the button each time you refresh the page, but you won't need to __*every*__ single time anyway. :) 
 
If you have any suggestions or there is a bug please use this repo to report them.

I am @tvle83 on HashTalk.org

Tips Accepted: 19SxbN1odamj1THVsqW7BfpiCir1SsrFjP

###Set up and Use

A bookmarklet is a bookmark link that uses javascript to perform tasks on the page. For this one it would be most convienent if it was in the bookmark toolbar for easy access.

Copy this code into the link part of a bookmark
```js
javascript: (function() {
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', 'https://cdn.rawgit.com/tvl83/hashmarketcalc/v1.0.1/hashmarketcalc.js');
    document.body.appendChild(s);
})();
```