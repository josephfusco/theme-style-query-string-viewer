chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {

	if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

		// Gather all hrefs from <link> elements within the document <head>
		const domInfo = new Array();
		const links = document.head.querySelectorAll('link');

		for (let i = 0; i < links.length; ++i) {
			const href = links[i].href;
			domInfo.push(href);
		}

		response(domInfo);
	}

});
