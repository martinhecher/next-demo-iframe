# IFrame Script Injector

A Next.js application that allows loading websites in an iframe and injecting JavaScript files into them. This tool is particularly useful for testing and debugging client-side scripts on web applications.

## Important Note

1. This application must be run on the same domain as the target website due to browser security restrictions (Same-Site Policy) to ensure session cookies are handled as expected.

2. For script injection to work it's neccessary to load the app with Chromium <https://download-chromium.appspot.com> to disable the browser's Same-Origin policy for accessing the iframe's content. Start Chromium with these flags:

```
--disable-web-security
--allow-file-access-from-files
--disable-site-isolation-trials
--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure,StrictOriginIsolation,BlockInsecurePrivateNetworkRequests
```

To start Chromium on MacOS use:

```open -na "Chromium" --args --disable-web-security --user-data-dir=/tmp/chromium --allow-file-access-from-files --disable-site-isolation-trials --disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure,StrictOriginIsolation,BlockInsecurePrivateNetworkRequests```

## Features

- Load websites in an iframe
- Inject JavaScript files into the loaded website
- Real-time logging of events
- Proxy server for handling cross-origin requests (optional, proof-of-concept only)

## Setup

1. `npm install` to install dependencies
2. `npm run dev` to start the development server on http://localhost:3000

## Usage

1. Enter the URL of the website/webapp you want to load
2. Enter the URL of the JavaScript file you want to inject
3. Click "Load" to load the website/webapp
4. The script will be automatically injected once the website/webapp loads
5. Whenever the website/webapp does a full page reload the injected script will automatically be injected into the new page

