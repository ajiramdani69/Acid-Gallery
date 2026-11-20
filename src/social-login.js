import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

const WEB_CLIENT_ID = '858235621289-jl8plc4o358qpo4nv4qibl1qiue98avj.apps.googleusercontent.com';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

const isNativeAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
let initPromise = null;

async function initializeGoogle() {
  if (!isNativeAndroid) return;
  if (!initPromise) {
    initPromise = SocialLogin.initialize({
      google: {
        webClientId: WEB_CLIENT_ID,
        mode: 'online'
      }
    });
  }
  return initPromise;
}

window.acidGalleryNativeGoogle = {
  isNativeAndroid,
  async login() {
    if (!isNativeAndroid) throw new Error('Login native hanya tersedia di aplikasi Android.');
    await initializeGoogle();
    const response = await SocialLogin.login({
      provider: 'google',
      options: { scopes: [DRIVE_SCOPE] }
    });
    const token = response?.result?.accessToken?.token;
    if (!token) {
      throw new Error('Google berhasil dipilih, tetapi access token Drive tidak diterima. Periksa konfigurasi OAuth Android dan SHA-1.');
    }
    return {
      accessToken: token,
      email: response?.result?.profile?.email || ''
    };
  },
  async logout() {
    if (isNativeAndroid) {
      await SocialLogin.logout({ provider: 'google' });
    }
  }
};

if (isNativeAndroid) {
  initializeGoogle().catch(error => console.error('Google native initialization failed:', error));
}
