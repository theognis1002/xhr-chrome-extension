console.log("content script start");

// inject injected script
var s = document.createElement("script");
s.src = chrome.runtime.getURL("injected.js");
s.onload = function () {
	this.remove();
};
(document.head || document.documentElement).appendChild(s);

// receive message from injected script
window.addEventListener("message", function (e) {
	// console.log(
	// 	"content script received:",
	// 	e.data.type,
	// 	e.data.url,
	// 	e.data.data
	// );
	if (e.data && e.data.url.includes("facets")) {
		let obj = JSON.parse(e.data.data);
		const sum = obj.facets.reduce(
			(accumulator, currentValue) => accumulator + currentValue.count,
			0
		);
		console.log(`***************${sum}`); // TM COUNT!!
	}
});
