workflow "Deploy to Heroku" {
  on = "push"
  resolves = "release"
}

action "release" {
  uses = "actions/heroku@master"
  needs = "push"
  args = "-a stream-chat-react"
  secrets = ["HEROKU_API_KEY"]
}