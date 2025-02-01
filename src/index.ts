import type { AstroIntegration } from 'astro';
import { Tolgee, type TolgeePlugin, type TolgeeOptions, type TolgeeInstance, type TranslationKey, type TranslateOptions } from '@tolgee/web';

(globalThis as any).__tolgee = (globalThis as any).__tolgee || null;

interface TolgeeConfig {
    options: TolgeeOptions,
    plugins: TolgeePlugin[],
}

export default function createIntegration(config: TolgeeConfig): AstroIntegration {
    return {
        name: 'astro-tolgee',
        hooks: {
            'astro:config:setup': async () => {
                if (!(globalThis as any).__tolgee) {
                    const chainer = Tolgee();
                    config.plugins.forEach(plugin => chainer.use(plugin));
                    const tolgee = chainer.init(config.options);
                    await tolgee.run();
                    (globalThis as any).__tolgee = tolgee;
                }
            },
        }
    };
}

export const useTranslation = async (language?: string) => {
    const tolgee: TolgeeInstance = (globalThis as any).__tolgee;
    if (!tolgee) {
        throw new Error('Tolgee is not initialized. Make sure createIntegration ran.');
    }
    if(language) {
        await tolgee.changeLanguage(language);
    }
    return { ...tolgee, t: (key: TranslationKey, defaultValue?: string, options?: TranslateOptions) => tolgee.t(key, defaultValue, { ...options, language }) };
}
