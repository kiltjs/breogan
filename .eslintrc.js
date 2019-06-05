module.exports = {
    "env": {
      "es6": true,
    },
    "globals": {
      "console": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
      "no-console": 1,
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "no-unused-vars": [
          "error",
          {
              "args": "after-used",
              "argsIgnorePattern": "^_\\w+"
          }
      ]
    }
}
