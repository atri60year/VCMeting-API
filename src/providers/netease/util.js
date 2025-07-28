import encrypt from './crypto.js'
import { net_ease_anonymous_token } from './config.js'
import { customAlphabet } from 'nanoid/non-secure'

const nanoid = customAlphabet('1234567890abcdef', 32)

// cookie字符串
const customCookieString = `
NMTID=00OB7KYOEsOy9iE4k7amN7buLgz0bwAAAGUvEjeAQ; _ntes_nnid=ac13f8e257f385d8135607bf99985dbf,1738325680321; _ntes_nuid=ac13f8e257f385d8135607bf99985dbf; WEVNSM=1.0.0; WNMCID=imyiva.1738325680569.01.0; __snaker__id=48wdr2bK1EGtEiCW; sDeviceId=YD-aUStQ9RCeVpFRxURVRfHMIG8NHRpWtfI; WM_TID=G6Y0xX43qppEFURBRVOWIJ%2BgINTtrWP0; _ga_EPDQHDTJH5=GS1.1.1739324092.1.0.1739324092.0.0.0; _ga=GA1.1.370412275.1739324092; ntes_kaola_ad=1; nts_mail_user=13690065910@163.com:-1:1; __remember_me=true; _iuqxldmzr_=32; __csrf=69126d57191b00745fad4194bfe0f696; WM_NI=fyC%2B4j%2BC%2FzMR1UEl56eRDtMkY0uBfLjEPvVk1fAwrOKB18JsKRitpqIWvOPWlrRjv7pChDUXCZ2CWtq0PnazoHTp7KbEG7pRzKIqqcyjU79SuuIbclQTG5dNVu3JkqvZVlc%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eebab65c91b38bbaf533f2a88aa2c14a929f9b82d77485939a88b139fcebbea2dc2af0fea7c3b92aa6a78dccb762e99de19bd05af38b8b8db83ea78e8c95d0619bf0bba3e548aa9ba097d561f3ba8f98f145899effd9c979898ea795f37b8b89bab0d35db0ae9e8bf53db49da8a5d8548186fea4d680b3f0a08fe472ad989c91b641a29b89d8f35aba958792f469bbb69bd8bc59b7ab8783e268938c89d6e74696abfdabea7bb6869a8de237e2a3; ntes_utid=tid._.u67UoK3jPrBBR0QEFEfTccqxNZX59Xar._.0.%2C.edd._.._.0; NTES_P_UTID=HAgnVXWmDudvAF88la5QeGFZIWvoFcFd|1753698732; P_INFO=m13690065910_1@163.com|1753698732|0|music|00&99|gud&1753606937&cloudmusic#gud&null#10#0#0|136910&1|cloudmusic|13690065910@163.com; __csrf=91f352b0a1754df9447f587688403b96; MUSIC_U=001EE1699953619DC03D9775CE2A16A350E9581DC057CD074627FFC1553C778ACA18091EC48CC4CFB9B2212FE9E9165AD9E22554D4BB1904C6DB4EAF06137958E2B146E2AA329731DFB85849FA16CF4949CA616C5DFF60DC3E5F72F3F66BE78637AC245F5255330DE82FCE215304F3833A60C458B59C2B5B107D46C307B4364B4D6E632EA033DC828B19A559D79C99A8DF25ECC9E2F31CD2548068E5EBD22F67B2B6164B9F248F26DE1030E3270726F559B2146683C7A9B858E4A293F5BFC2D14EC1980B78004D1DBA8BBD93DE8391D514128010ACBFB9C261BA1C8F51CE8A56D6AE4534B93195CEF2CD0F016CCB424EA2111024D7C9741116517B3E3560D6ABEB212E63A25A57E9C211F80B5E7A7F0CB2F0A755125232788ECA410A55FF24E3E5C4F1B19F5481A2A436100BA3A50C8008C6959790FF934A92D5F0B2D4DB212819592A6B2208D26F939E7840F8CF559F85705E1A8F079313390A1CAF478A5AFE1D2D00D94B4FD33AF336BFDCE3F8C2A1D483B77EF1CB5CA000BB2D201791DBAC65E893BAA8403A0ED455510A92695D2BCB2AF119D66C75A5C019439D96C8541F76; gdxidpyhxdE=iPj%2BQ%5C75bohBMI3V%2B9QI2QfgKnv10%2F5a2aXMRkXvZiVxqWQtXTESmMXhXfcuwUuhAEwUvnLsuSuIJ8%2Bhlszo5WjBnklP%5CO9ELlhZNmcJggm%2BGS1NwOOJQixdU7LqTbuntpTd48D%2FrTCLAMDXw8DEfjefn%5C5HITGjd5GUr6Wadui5%5CSEb%3A1753702147960; JSESSIONID-WYYY=1UPmv5W3jtpwB%2FQaKPWox1%2F%2Fc%5C3zH859K%5C%5C3fJA7tDnoq6mXbXH6jrUlVYNeWW2D3u5Yg7R3iogO%2Bq5RvHeYFf5k3Appzi%5CMY%2BsPyBJQNrNMosPpggMl%2B0NsB5Yz306WIQ6E64EKSCuRf85FT4dnI9T4n0c3pT%2B%2Bfcim%2FpXrFMPm9VpZ%3A1753707968990; playerid=35358144
`;

// 将cookie字符串转换为对象
const customCookieObject = customCookieString.split(';').reduce((acc, cookie) => {
    const [key, ...rest] = cookie.trim().split('=');
    acc[key] = rest.join('='); // 处理值中包含等号的情况
    return acc;
  }, {});
  

const chooseUserAgent = (ua = false) => {
    const userAgentList = {
        mobile: [
            // iOS 13.5.1 14.0 beta with safari
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.',
            // iOS with qq micromsg
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML like Gecko) Mobile/14A456 QQ/6.5.7.408 V1_IPH_SQ_6.5.7_1_APP_A Pixel/750 Core/UIWebView NetType/4G Mem/103',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f27) NetType/WIFI Language/zh',
            // Android -> Huawei Xiaomi
            'Mozilla/5.0 (Linux; Android 9; PCT-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.64 HuaweiBrowser/10.0.3.311 Mobile Safari/537.36',
            'Mozilla/5.0 (Linux; U; Android 9; zh-cn; Redmi Note 8 Build/PKQ1.190616.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.141 Mobile Safari/537.36 XiaoMi/MiuiBrowser/12.5.22',
            // Android + qq micromsg
            'Mozilla/5.0 (Linux; Android 10; YAL-AL00 Build/HUAWEIYAL-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2581 MMWEBSDK/200801 Mobile Safari/537.36 MMWEBID/3027 MicroMessenger/7.0.18.1740(0x27001235) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64',
            'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BKK-AL10 Build/HONORBKK-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/10.6 Mobile Safari/537.36',
        ],
        pc: [
            // macOS 10.15.6  Firefox / Chrome / Safari
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.30 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
            // Windows 10 Firefox / Chrome / Edge
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.30 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586',
            // Linux 就算了
        ],
    }
    let realUserAgentList =
        userAgentList[ua] || userAgentList.mobile.concat(userAgentList.pc)
    return ['mobile', 'pc', false].indexOf(ua) > -1
        ? realUserAgentList[Math.floor(Math.random() * realUserAgentList.length)]
        : ua
}

const cnip = () => {
    //国内城市IP段
    const ips = '58.14.0.0,58.16.0.0,58.24.0.0,58.30.0.0,58.32.0.0,58.66.0.0,58.68.128.0,58.82.0.0,58.87.64.0,58.99.128.0,58.100.0.0,58.116.0.0,58.128.0.0,58.144.0.0,58.154.0.0,58.192.0.0,58.240.0.0,59.32.0.0,59.64.0.0,59.80.0.0,59.107.0.0,59.108.0.0,59.151.0.0,59.155.0.0,59.172.0.0,59.191.0.0,59.191.240.0,59.192.0.0,60.0.0.0,60.55.0.0,60.63.0.0,60.160.0.0,60.194.0.0,60.200.0.0,60.208.0.0,60.232.0.0,60.235.0.0,60.245.128.0,60.247.0.0,60.252.0.0,60.253.128.0,60.255.0.0,61.4.80.0,61.4.176.0,61.8.160.0,61.28.0.0,61.29.128.0,61.45.128.0,61.47.128.0,61.48.0.0,61.87.192.0,61.128.0.0,61.232.0.0,61.236.0.0,61.240.0.0,114.28.0.0,114.54.0.0,114.60.0.0,114.64.0.0,114.68.0.0,114.80.0.0,116.1.0.0,116.2.0.0,116.4.0.0,116.8.0.0,116.13.0.0,116.16.0.0,116.52.0.0,116.56.0.0,116.58.128.0,116.58.208.0,116.60.0.0,116.66.0.0,116.69.0.0,116.70.0.0,116.76.0.0,116.89.144.0,116.90.184.0,116.95.0.0,116.112.0.0,116.116.0.0,116.128.0.0,116.192.0.0,116.193.16.0,116.193.32.0,116.194.0.0,116.196.0.0,116.198.0.0,116.199.0.0,116.199.128.0,116.204.0.0,116.207.0.0,116.208.0.0,116.212.160.0,116.213.64.0,116.213.128.0,116.214.32.0,116.214.64.0,116.214.128.0,116.215.0.0,116.216.0.0,116.224.0.0,116.242.0.0,116.244.0.0,116.248.0.0,116.252.0.0,116.254.128.0,116.255.128.0,117.8.0.0,117.21.0.0,117.22.0.0,117.24.0.0,117.32.0.0,117.40.0.0,117.44.0.0,117.48.0.0,117.53.48.0,117.53.176.0,117.57.0.0,117.58.0.0,117.59.0.0,117.60.0.0,117.64.0.0,117.72.0.0,117.74.64.0,117.74.128.0,117.75.0.0,117.76.0.0,117.80.0.0,117.100.0.0,117.103.16.0,117.103.128.0,117.106.0.0,117.112.0.0,117.120.64.0,117.120.128.0,117.121.0.0,117.121.128.0,117.121.192.0,117.122.128.0,117.124.0.0,117.128.0.0,118.24.0.0,118.64.0.0,118.66.0.0,118.67.112.0,118.72.0.0,118.80.0.0,118.84.0.0,118.88.32.0,118.88.64.0,118.88.128.0,118.89.0.0,118.91.240.0,118.102.16.0,118.112.0.0,118.120.0.0,118.124.0.0,118.126.0.0,118.132.0.0,118.144.0.0,118.178.0.0,118.180.0.0,118.184.0.0,118.192.0.0,118.212.0.0,118.224.0.0,118.228.0.0,118.230.0.0,118.239.0.0,118.242.0.0,118.244.0.0,118.248.0.0,119.0.0.0,119.2.0.0,119.2.128.0,119.3.0.0,119.4.0.0,119.8.0.0,119.10.0.0,119.15.136.0,119.16.0.0,119.18.192.0,119.18.208.0,119.18.224.0,119.19.0.0,119.20.0.0,119.27.64.0,119.27.160.0,119.27.192.0,119.28.0.0,119.30.48.0,119.31.192.0,119.32.0.0,119.40.0.0,119.40.64.0,119.40.128.0,119.41.0.0,119.42.0.0,119.42.136.0,119.42.224.0,119.44.0.0,119.48.0.0,119.57.0.0,119.58.0.0,119.59.128.0,119.60.0.0,119.62.0.0,119.63.32.0,119.75.208.0,119.78.0.0,119.80.0.0,119.84.0.0,119.88.0.0,119.96.0.0,119.108.0.0,119.112.0.0,119.128.0.0,119.144.0.0,119.148.160.0,119.161.128.0,119.162.0.0,119.164.0.0,119.176.0.0,119.232.0.0,119.235.128.0,119.248.0.0,119.253.0.0,119.254.0.0,120.0.0.0,120.24.0.0,120.30.0.0,120.32.0.0,120.48.0.0,120.52.0.0,120.64.0.0,120.72.32.0,120.72.128.0,120.76.0.0,120.80.0.0,120.90.0.0,120.92.0.0,120.94.0.0,120.128.0.0,120.136.128.0,120.137.0.0,120.192.0.0,121.0.16.0,121.4.0.0,121.8.0.0,121.16.0.0,121.32.0.0,121.40.0.0,121.46.0.0,121.48.0.0,121.51.0.0,121.52.160.0,121.52.208.0,121.52.224.0,121.55.0.0,121.56.0.0,121.58.0.0,121.58.144.0,121.59.0.0,121.60.0.0,121.68.0.0,121.76.0.0,121.79.128.0,121.89.0.0,121.100.128.0,121.101.208.0,121.192.0.0,121.201.0.0,121.204.0.0,121.224.0.0,121.248.0.0,121.255.0.0,122.0.64.0,122.0.128.0,122.4.0.0,122.8.0.0,122.48.0.0,122.49.0.0,122.51.0.0,122.64.0.0,122.96.0.0,122.102.0.0,122.102.64.0,122.112.0.0,122.119.0.0,122.136.0.0,122.144.128.0,122.152.192.0,122.156.0.0,122.192.0.0,122.198.0.0,122.200.64.0,122.204.0.0,122.224.0.0,122.240.0.0,122.248.48.0,123.0.128.0,123.4.0.0,123.8.0.0,123.49.128.0,123.52.0.0,123.56.0.0,123.64.0.0,123.96.0.0,123.98.0.0,123.99.128.0,123.100.0.0,123.101.0.0,123.103.0.0,123.108.128.0,123.108.208.0,123.112.0.0,123.128.0.0,123.136.80.0,123.137.0.0,123.138.0.0,123.144.0.0,123.160.0.0,123.176.80.0,123.177.0.0,123.178.0.0,123.180.0.0,123.184.0.0,123.196.0.0,123.199.128.0,123.206.0.0,123.232.0.0,123.242.0.0,123.244.0.0,123.249.0.0,123.253.0.0,124.6.64.0,124.14.0.0,124.16.0.0,124.20.0.0,124.28.192.0,124.29.0.0,124.31.0.0,124.40.112.0,124.40.128.0,124.42.0.0,124.47.0.0,124.64.0.0,124.66.0.0,124.67.0.0,124.68.0.0,124.72.0.0,124.88.0.0,124.108.8.0,124.108.40.0,124.112.0.0,124.126.0.0,124.128.0.0,124.147.128.0,124.156.0.0,124.160.0.0,124.172.0.0,124.192.0.0,124.196.0.0,124.200.0.0,124.220.0.0,124.224.0.0,124.240.0.0,124.240.128.0,124.242.0.0,124.243.192.0,124.248.0.0,124.249.0.0,124.250.0.0,124.254.0.0,125.31.192.0,125.32.0.0,125.58.128.0,125.61.128.0,125.62.0.0,125.64.0.0,125.96.0.0,125.98.0.0,125.104.0.0,125.112.0.0,125.169.0.0,125.171.0.0,125.208.0.0,125.210.0.0,125.213.0.0,125.214.96.0,125.215.0.0,125.216.0.0,125.254.128.0,134.196.0.0,159.226.0.0,161.207.0.0,162.105.0.0,166.111.0.0,167.139.0.0,168.160.0.0,169.211.1.0,192.83.122.0,192.83.169.0,192.124.154.0,192.188.170.0,198.17.7.0,202.0.110.0,202.0.176.0,202.4.128.0,202.4.252.0,202.8.128.0,202.10.64.0,202.14.88.0,202.14.235.0,202.14.236.0,202.14.238.0,202.20.120.0,202.22.248.0,202.38.0.0,202.38.64.0,202.38.128.0,202.38.136.0,202.38.138.0,202.38.140.0,202.38.146.0,202.38.149.0,202.38.150.0,202.38.152.0,202.38.156.0,202.38.158.0,202.38.160.0,202.38.164.0,202.38.168.0,202.38.176.0,202.38.184.0,202.38.192.0,202.41.152.0,202.41.240.0,202.43.144.0,202.46.32.0,202.46.224.0,202.60.112.0,202.63.248.0,202.69.4.0,202.69.16.0,202.70.0.0,202.74.8.0,202.75.208.0,202.85.208.0,202.90.0.0,202.90.224.0,202.90.252.0,202.91.0.0,202.91.128.0,202.91.176.0,202.91.224.0,202.92.0.0,202.92.252.0,202.93.0.0,202.93.252.0,202.95.0.0,202.95.252.0,202.96.0.0,202.112.0.0,202.120.0.0,202.122.0.0,202.122.32.0,202.122.64.0,202.122.112.0,202.122.128.0,202.123.96.0,202.124.24.0,202.125.176.0,202.127.0.0,202.127.12.0,202.127.16.0,202.127.40.0,202.127.48.0,202.127.112.0,202.127.128.0,202.127.160.0,202.127.192.0,202.127.208.0,202.127.212.0,202.127.216.0,202.127.224.0,202.130.0.0,202.130.224.0,202.131.16.0,202.131.48.0,202.131.208.0,202.136.48.0,202.136.208.0,202.136.224.0,202.141.160.0,202.142.16.0,202.143.16.0,202.148.96.0,202.149.160.0,202.149.224.0,202.150.16.0,202.152.176.0,202.153.48.0,202.158.160.0,202.160.176.0,202.164.0.0,202.164.25.0,202.165.96.0,202.165.176.0,202.165.208.0,202.168.160.0,202.170.128.0,202.170.216.0,202.173.8.0,202.173.224.0,202.179.240.0,202.180.128.0,202.181.112.0,202.189.80.0,202.192.0.0,203.18.50.0,203.79.0.0,203.80.144.0,203.81.16.0,203.83.56.0,203.86.0.0,203.86.64.0,203.88.32.0,203.88.192.0,203.89.0.0,203.90.0.0,203.90.128.0,203.90.192.0,203.91.32.0,203.91.96.0,203.91.120.0,203.92.0.0,203.92.160.0,203.93.0.0,203.94.0.0,203.95.0.0,203.95.96.0,203.99.16.0,203.99.80.0,203.100.32.0,203.100.80.0,203.100.96.0,203.100.192.0,203.110.160.0,203.118.192.0,203.119.24.0,203.119.32.0,203.128.32.0,203.128.96.0,203.130.32.0,203.132.32.0,203.134.240.0,203.135.96.0,203.135.160.0,203.142.219.0,203.148.0.0,203.152.64.0,203.156.192.0,203.158.16.0,203.161.192.0,203.166.160.0,203.171.224.0,203.174.7.0,203.174.96.0,203.175.128.0,203.175.192.0,203.176.168.0,203.184.80.0,203.187.160.0,203.190.96.0,203.191.16.0,203.191.64.0,203.191.144.0,203.192.0.0,203.196.0.0,203.207.64.0,203.207.128.0,203.208.0.0,203.208.16.0,203.208.32.0,203.209.224.0,203.212.0.0,203.212.80.0,203.222.192.0,203.223.0.0,210.2.0.0,210.5.0.0,210.5.144.0,210.12.0.0,210.14.64.0,210.14.112.0,210.14.128.0,210.15.0.0,210.15.128.0,210.16.128.0,210.21.0.0,210.22.0.0,210.23.32.0,210.25.0.0,210.26.0.0,210.28.0.0,210.32.0.0,210.51.0.0,210.52.0.0,210.56.192.0,210.72.0.0,210.76.0.0,210.78.0.0,210.79.64.0,210.79.224.0,210.82.0.0,210.87.128.0,210.185.192.0,210.192.96.0,211.64.0.0,211.80.0.0,211.96.0.0,211.136.0.0,211.144.0.0,211.160.0.0,218.0.0.0,218.56.0.0,218.64.0.0,218.96.0.0,218.104.0.0,218.108.0.0,218.185.192.0,218.192.0.0,218.240.0.0,218.249.0.0,219.72.0.0,219.82.0.0,219.128.0.0,219.216.0.0,219.224.0.0,219.242.0.0,219.244.0.0,220.101.192.0,220.112.0.0,220.152.128.0,220.154.0.0,220.160.0.0,220.192.0.0,220.231.0.0,220.231.128.0,220.232.64.0,220.234.0.0,220.242.0.0,220.248.0.0,220.252.0.0,221.0.0.0,221.8.0.0,221.12.0.0,221.12.128.0,221.13.0.0,221.14.0.0,221.122.0.0,221.129.0.0,221.130.0.0,221.133.224.0,221.136.0.0,221.172.0.0,221.176.0.0,221.192.0.0,221.196.0.0,221.198.0.0,221.199.0.0,221.199.128.0,221.199.192.0,221.199.224.0,221.200.0.0,221.208.0.0,221.224.0.0,222.16.0.0,222.32.0.0,222.64.0.0,222.125.0.0,222.126.128.0,222.128.0.0,222.160.0.0,222.168.0.0,222.176.0.0,222.192.0.0,222.240.0.0,222.248.0.0';
    const arr = ips.split(',');
    const rnd = parseInt(Math.random() * ((arr.length - 1) - 0 + 1) + 0, 10)
    const ip = arr[rnd];
    return ip;
}


export const request = async (method, url, data = {}, options) => {

    // 确保options.cookie是一个对象
    if (typeof options.cookie === 'undefined' || options.cookie === null) {
        options.cookie = {};
    }

    // 合并自定义cookie和用户定义的cookie（如果有）
    options.cookie = {
        ...customCookieObject,
        ...options.cookie
    };
  
    let headers = { 'User-Agent': chooseUserAgent(options.ua) }
    if (method.toUpperCase() === 'POST')
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (url.includes('music.163.com'))
        headers['Referer'] = 'https://music.163.com'

    let ip = cnip() || ''
    // console.log(ip)
    if (ip) {
        headers['X-Real-IP'] = ip
        headers['X-Forwarded-For'] = ip
    }
    // headers['X-Real-IP'] = '118.88.88.88'
    if (typeof options.cookie === "undefined")
        options.cookie = {}

    if (typeof options.cookie === 'object') {
        options.cookie = {
            ...options.cookie,
            __remember_me: true,
            // NMTID: nanoid(),
            _ntes_nuid: nanoid(),
        }
        if (!options.cookie.MUSIC_U) {
            // 游客
            if (!options.cookie.MUSIC_A) {
                options.cookie.MUSIC_A = net_ease_anonymous_token
            }
        }
        headers['Cookie'] = Object.keys(options.cookie)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(options.cookie[key]),
            )
            .join('; ')
    } else if (options.cookie) {
        headers['Cookie'] = options.cookie
    } else {
        headers['Cookie'] = '__remember_me=true; NMTID=xxx'
    }

    // console.log(options.cookie, headers['Cookie'])
    if (options.crypto === 'weapi') {
        let csrfToken = (headers['Cookie'] || '').match(/_csrf=([^(;|$)]+)/)
        data.csrf_token = csrfToken ? csrfToken[1] : ''
        data = encrypt.weapi(data)
        url = url.replace(/\w*api/, 'weapi')
    } else if (options.crypto === 'linuxapi') {
        data = encrypt.linuxapi({
            method: method,
            url: url.replace(/\w*api/, 'api'),
            params: data,
        })
        headers['User-Agent'] =
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
        url = 'https://music.163.com/api/linux/forward'
    } else if (options.crypto === 'eapi') {
        const cookie = options.cookie || {}
        const csrfToken = cookie['__csrf'] || ''
        const header = {
            osver: cookie.osver, //系统版本
            deviceId: cookie.deviceId, //encrypt.base64.encode(imei + '\t02:00:00:00:00:00\t5106025eb79a5247\t70ffbaac7')
            appver: cookie.appver || '8.7.01', // app版本
            versioncode: cookie.versioncode || '140', //版本号
            mobilename: cookie.mobilename, //设备model
            buildver: cookie.buildver || Date.now().toString().substr(0, 10),
            resolution: cookie.resolution || '1920x1080', //设备分辨率
            __csrf: csrfToken,
            os: cookie.os || 'android',
            channel: cookie.channel,
            requestId: `${Date.now()}_${Math.floor(Math.random() * 1000)
                .toString()
                .padStart(4, '0')
                } `,
        }
        if (cookie.MUSIC_U) header['MUSIC_U'] = cookie.MUSIC_U
        if (cookie.MUSIC_A) header['MUSIC_A'] = cookie.MUSIC_A
        headers['Cookie'] = Object.keys(header)
            .map(
                (key) =>
                    encodeURIComponent(key) + '=' + encodeURIComponent(header[key]),
            )
            .join('; ')
        data.header = header
        data = encrypt.eapi(options.url, data)
        url = url.replace(/\w*api/, 'eapi')
    }

    let settings = {
        method,
        headers,
        body: new URLSearchParams(data).toString()
    }


    if (options.crypto === 'eapi') {
        settings = {
            ...settings,
            responseType: 'arraybuffer',
        }
    }


    let res, count = 0
    do {
        res = await fetch(url, settings)
        if (options.crypto === 'eapi') {
            const _ = await res.arrayBuffer('utf-8')
            const enc = new TextDecoder()
            res = JSON.parse(enc.decode(_))
        } else {
            res = await res.json()
        }
        count++
        if (count > 1) {
            console.log(`Request ${count} times.`)
        }
        if (count > 5) {
            console.error(`Max retries exceeded.`)
            break
        }
        await new Promise(resolve => setTimeout(resolve, 100))
    } while (res.code == -460)  // { code: -460, message: '网络太拥挤，请稍候再试！' }

    return res;

}

export const map_song_list = (song_list) => {
    return song_list.songs.map(song => {
        const artists = song.ar || song.artists
        return {
            title: song.name,
            author: artists.reduce((i, v) => ((i ? i + " / " : i) + v.name), ''),
            pic: song?.al?.picUrl || song.id,
            url: song.id,
            lrc: song.id
        }
    })
}