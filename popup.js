let openVisual = document.getElementById('openVisual');

openVisual.onclick = function(element)
{
  chrome.tabs.create({url: "tool.html"})
};
