import '../css/popup.css'
import reloader from './popup/reload'

const reloadBtn = document.getElementById('reloadBtn')

reloadBtn.addEventListener('click', async () => {
  const seconds = 10000

  chrome.storage.local.set({ seconds })

  console.log(`seconds: ${seconds}`)

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reloader
  })
})
