import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';


export const homeRedirectGuard: CanActivateFn = () => {
    const router: Router = inject(Router);
    const captchaService: CaptchaService = inject(CaptchaService);

    if (captchaService.isCaptchaCompleted()) {
        router.navigate(['dashboard']);
        return false;
    }
    return true;
};
