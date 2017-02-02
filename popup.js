function setDOMInfo(info) {

	const results = document.getElementById('results');
	const appInfo = document.getElementById('info');
	const homepageUrl = getExtensionHomepageUrl();
	const appName = getExtensionName();
	const appVersion = getExtensionVersion();

	// Set popup.html footer info
	appInfo.innerHTML = `<a target="_blank" href="${homepageUrl}">${appName}</a> v${appVersion}`;

	// loop through hrefs passed over from content script
	for (let s of info) {

		// If theme stylesheet
		if (s.indexOf('style.css') + 1 != '') {

			let a = s.split('/');
			let themeDirectory = a[a.length - 2];
			let queryString = s.slice(s.indexOf('style.css?') + 10);

			results.insertAdjacentHTML('beforeend',
				`<tr class="theme">
					<td>
						${themeDirectory}
					</td>
					<td>
						<a href="${s}" target="_blank">${queryString}</a>
					</td>
				</tr>`);
		}
	}
}

function getExtensionVersion() {
	return chrome.app.getDetails().version;
}

function getExtensionName() {
	return chrome.app.getDetails().name;
}

function getExtensionHomepageUrl() {
	return chrome.app.getDetails().homepage_url;
}

window.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	},
	tabs => {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from:'popup', subject:'DOMInfo'},
			setDOMInfo
		);
	});
});
