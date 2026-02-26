import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CaptchaService {
    private readonly sessionKey: string = 'captchaCompleted';
    private readonly captchaCompletedSignal: WritableSignal<boolean> = signal(
        sessionStorage.getItem(this.sessionKey) === 'true'
    );

    public isCaptchaCompleted(): boolean {
        return this.captchaCompletedSignal();
    }

    public setCaptchaCompleted(completed: boolean): void {
        this.captchaCompletedSignal.set(completed);
        sessionStorage.setItem(this.sessionKey, String(completed));
    }
}
