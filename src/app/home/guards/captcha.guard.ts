import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaService } from '../services/captcha.service';

export const captchaGuard: CanActivateFn = () => {
    const router: Router = inject(Router);
    const captchaService: CaptchaService = inject(CaptchaService);

    if (captchaService.isCaptchaCompleted()) {
        return true;
    } else {
        router.navigate(['']);
    }

    return false;
};
