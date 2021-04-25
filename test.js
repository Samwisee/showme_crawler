const validateVideo = async (elementID) => {
  try {
    await page.waitForFunction(() => {
      // check if the iframe exists on the page
      const iframe = document.getElementById(elementID)
      if (iframe == null) {
        return false
      }

      // make sure the video element has rendered within the iframe
      const videos = iframe.contentWindow.document.getElementsByTagName('video')
      if (videos.length == 0) {
        return false
      }

      // make sure the video element has a src attribute
      const src = videos[0].getAttribute("src")
      return src
    }, { timeout: 1000 })
  } catch (err) {
    fail(err)
  }
}

describe('ShowMe Videos', () => {
  // set up
  beforeAll(async () => {
    // make sure we log any browser errors to help debugging
    page.on('console', msg => console.log(msg))
    
    await page.goto(`file://${process.cwd()}/index.html`)
  })
  
  it('it should return a success for a youtube video that does load', async () => {

    validateVideo("working")
    // console.log(video)
    // expect(video).toContain('Hello')
  })

  it('it should return a failure for a youtube video that does not load', async () => {

    validateVideo("not-working")

  })
})
