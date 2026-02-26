import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { captchaGuard } from './home/guards/captcha.guard';
import { HomeComponent } from './home/components/home.component';
import { homeRedirectGuard } from './home/guards/dashboard-redirect.guard';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { title: 'I\'m Not a Robot' },
        canActivate: [homeRedirectGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
        canActivate: [captchaGuard],
    },
];

