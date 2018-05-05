if (![...navigator.plugins].some(({name}) => name.includes("Flash")))
{
 chrome.tabs.create({url: "enable-flash.html"});
}