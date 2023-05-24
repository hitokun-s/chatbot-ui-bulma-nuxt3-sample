import { Readable } from "stream"
import { defineEventHandler, sendStream, readBody } from "h3"

export default defineEventHandler(async (event) => {
  const userMessage = await readBody(event)
  console.log(userMessage)

  const botMessages = ["you ", "said ", ...(userMessage.match(/.{1,4}/g) ?? [])]

  var cnt = 0
  const readable = new Readable({ highWaterMark: 0, objectMode: true })
  readable._read = function (n) {
    setTimeout(function () {
      if (cnt < botMessages.length) {
        cnt++
        return readable.push(botMessages[cnt - 1])
      }
      readable.push(null)
    }, 500)
  }

  return sendStream(event, readable)
})
