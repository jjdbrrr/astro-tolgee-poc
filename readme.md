# Astro + Tolgee Prototype

I built this to allow Tolgee to be integrated into Astro. This is a prototype, the idea is to move it to its own package.

**Demo**
Available here https://astro-tolgee-poc.pages.dev

**How to install:**
Modify you `astro.config.mjs` file as follows:

```js
// path to the astro integration (plugin)
import tolgee from '../src/index';

// integrations[]
tolgee({
    options: {
        language: 'en',
        apiUrl: 'https://app.tolgee.io',
        apiKey: process.env.TOLGEE_API_KEY, 
    },
    plugins: [FormatSimple(), DevTools()]
})
```

The integration takes an object with the keys `options` and `plugins`. This allows you to integrate whatever options you may need, including staticData. Plugins is an array of `TolgeePlugins` you'd like to apply. 

Known issues:
- Tolgee DevTools doesn't seem to work yet
- Modification of the translations requires a reset of the server. It might be using the wrong lifecycle hook but couldn't figure out which one would solve my use case.

Update:
- Added tolgee/web to `Layout.astro` as it makes the client SDK available and fixes Tolgee detection. Highlighting works but clicking and opening the dialog fails......