# #mobile-frontend configuration options
module.exports = {
  title: "pimatic-angular-material-frontend config"
  type: "object"
  properties:
    mountPath:
      description: "The path in the URL on which the frontend is mounted"
      type: "string"
      default: "/material"
    customTitle:
      description: "Custimg title to use for the pimatic installation"
      type: "string"
      default: "Pimatic Material"
    debug:
      description: "that to true to get additional debug outputs"
      type: "boolean"
      default: false
}