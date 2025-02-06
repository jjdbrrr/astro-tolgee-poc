// @ts-check
import { defineConfig } from 'astro/config';
import tolgee from '../src/index';
import { DevTools, FormatSimple } from '@tolgee/web';

// For production, passing in static files
import localeEn from "./public/i18n/en.json";
import localeFr from "./public/i18n/fr.json";
import localeDe from "./public/i18n/de.json";

// https://astro.build/config
export default defineConfig({
  integrations: [
        tolgee({
            options: {
                language: 'en',
                apiUrl: 'https://app.tolgee.io',
                apiKey: process.env.TOLGEE_API_KEY,
                observerOptions: {
                    fullKeyEncode: true,
                },
                // For production
                staticData: {
                    'en': localeEn,
                    'fr': localeFr,
                    'de': localeDe,
                },
            },
            plugins: [FormatSimple(), DevTools()]
        })
    ],
});
