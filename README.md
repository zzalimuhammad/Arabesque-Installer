# Arabesque Web Installer

[![Last commit](https://img.shields.io/github/last-commit/breiler/fluid-installer.svg?maxAge=1800)](https://github.com/breiler/fluid-installer)

The Arabesque Web Installer is a web based tool to install and configure firmware.

![Arabesque Web Installer](https://github.com/breiler/fluid-installer/raw/master/pictures/screenshot.png "UGS Splash Image")


## Building

Build a distribution using the following commands:

````
npm install
npm run build
```

## Developing
Start a development server using the following commands then open your browser to http://localhost:1234/

```
# Remove build cache
rm -r .parcel-cache

npm install
npm start
```

