import { Impit } from 'impit';
import { ImpitParams, Chrome } from '../constants/constants';
import { ChromeVersion } from '../interface/UserAgentUtil';
const impit = new Impit({
    browser: 'chrome',
    ignoreTlsErrors: ImpitParams.ignoreTlsErrors,
    timeout: ImpitParams.timeout,
})

class browserUtils {
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.7339.214 ADG/11.1.5043 Safari/537.36

    async getChromeVersion(): Promise<string | null> {
        try {
            const req = await impit.fetch(Chrome.url)
            console.log('Chrome version request status:', req.status)
            if (!req.ok) {
                console.error('Failed to fetch Chrome version:', req.status, req.statusText)
                return null
            }
            const data: ChromeVersion = await req.json()
            return data?.channels?.Stable?.version || null
        } catch (error) {
            console.error('Error occurred while fetching Chrome version:', error)
            return null
        }
    }

    async getSystemComponents (): Promise<string> {
        return 'Windows NT 10.0; Win64; x64'
    }
}

export default browserUtils