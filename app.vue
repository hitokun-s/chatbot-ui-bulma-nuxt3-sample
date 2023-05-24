<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container is-fluid">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <!--<img class="image" src="https://bulma.io/images/bulma-logo.png" alt="" width="96px">-->
            <h1 class="title">HOGE-AI</h1>
          </a>
          <a
            class="navbar-burger"
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="menu"
            @click="isToggle = !isToggle"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="menu" class="navbar-menu" :class="{ 'is-active': isToggle }">
          <div class="navbar-start">
            <a class="navbar-item" href="https://twitter.com/ginyu_pro">creator</a>
            <a class="navbar-item" href="#">dummy1</a>
            <a class="navbar-item" href="#">dummy2</a>
          </div>
          <div class="navbar-end">
            <div v-if="isLoggedIn" class="navbar-item">
              <span class="icon">
                <font-awesome-icon icon="user" size="2x" :style="{ color: 'grey' }" />
              </span>
            </div>
            <div class="navbar-item">
              <button v-if="!isLoggedIn" class="button" @click="login">login</button>
              <button v-if="isLoggedIn" class="button" @click="logout">logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column">
            <div class="box">
              <div class="content">
                <div v-for="message in messages">
                  <div v-if="message.role == 'assistant'" class="media">
                    <figure class="media-left bot-icon">
                      <p class="image is-48x48">
                        <img class="is-rounded" src="img/segodon.png" alt="User icon" />
                      </p>
                    </figure>
                    <div class="message">
                      {{ message.content }}
                    </div>
                  </div>
                  <div v-if="message.role == 'user'" class="media chat-right">
                    <div class="message">
                      {{ message.content }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="elm-input">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column">
            <div class="box">
              <div class="field is-grouped">
                <div class="control is-expanded">
                  <input
                    v-model="userInput"
                    class="input"
                    type="text"
                    placeholder="Type your message..."
                  />
                </div>
                <div class="control">
                  <button class="button is-info" :disabled="userInput == ''" @click="send">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      messages: [
        { role: "assistant", content: "How can I help you?" },
        { role: "user", content: "This is just a demo." },
        { role: "assistant", content: "Oh I see." },
      ],
      userInput: "",
      isToggle: false,
      isLoggedIn: false,
    }
  },
  methods: {
    async send() {
      this.messages.push({ role: "user", content: this.userInput })
      this.messages.push({ role: "assistant", content: "" })
      const userMessage = this.userInput
      this.userInput = ""

      this.$nextTick(function () {
        window.scrollTo(0, document.body.scrollHeight)
      })

      const response = await fetch("/api/mock", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: userMessage,
      })
      if (!response.ok) throw new Error(await response.text())

      const reader = response.body.getReader()
      // another option:
      // const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        const text = decoder.decode(value, { stream: true })
        console.log(text)
        this.messages[this.messages.length - 1].content += text
      }
    },
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
    },
  },
}
</script>

<style>
.message {
  max-width: 80%;
  padding: 10px;
  word-wrap: break-word;
}

.bot-icon {
  margin-left: 5px !important;
  margin-right: 5px !important;
}

.chat-right {
  justify-content: flex-end;
}

.elm-input {
  position: fixed;
  bottom: 0;
  width: 100%;
}

body {
  padding-bottom: 80px;
}
</style>
