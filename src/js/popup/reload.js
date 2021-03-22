export default function () {
  chrome.storage.local.get('seconds', ({ seconds }) => {
    console.log('RELOAD', `seconds: ${seconds}`)
    setTimeout(function () {
      location.reload(true)
    }, seconds)
  })
}
