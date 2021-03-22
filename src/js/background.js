import '../img/icon-128.png'
import '../img/icon-34.png'

const seconds = 0

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ seconds })
  console.log('Default seconds to reload a page set to 0 seconds', `seconds: ${seconds}`)
})
