module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": ["eslint:recommended",
    "plugin:vue/essential"
  ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};