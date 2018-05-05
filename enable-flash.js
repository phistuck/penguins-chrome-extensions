var tabID = null;
function getSettingsTabID(tab)
{
 tabID = tab.id;
}

function openFlashContentSettings(e)
{
 selectAndCopy();
 e.preventDefault();
 chrome.tabs.create({url: "chrome://settings/content/flash"}, getSettingsTabID);
 setInterval(closeWhenAllowed, 500);
}

function selectAndCopy()
{
 eInput.focus();
 eInput.select();
 document.execCommand("copy");
 document.querySelector(".copied").hidden = false;
}

function closeWhenAllowed()
{
 if (![...navigator.plugins].some(({name}) => name.includes("Flash")))
 {
  return;
 }
 window.close();
 if (!tabID)
 {
  return;
 }
 chrome.tabs.remove(tabID);
}

document.querySelector("a").addEventListener("click", openFlashContentSettings);
document.querySelector("a").addEventListener("auxclick", openFlashContentSettings);
var eInput = document.querySelector("input");
eInput.addEventListener("click", selectAndCopy);
eInput.value = chrome.runtime.getURL('/');